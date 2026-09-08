import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_DATASETS, Dataset } from '@/data/datahub-datasets';
import fs from 'fs';
import path from 'path';

// Runtime store for published datasets
let runtimeDatasets: Dataset[] = [...INITIAL_DATASETS];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = (searchParams.get('query') || '').toLowerCase().trim();
  const category = searchParams.get('category') || 'All';
  const frequency = searchParams.get('frequency') || 'All';
  const datasetId = searchParams.get('id');

  if (datasetId) {
    const found = runtimeDatasets.find(d => d.id === datasetId);
    if (!found) {
      return NextResponse.json({ error: 'Dataset not found' }, { status: 404 });
    }
    return NextResponse.json({ dataset: found });
  }

  let results = [...runtimeDatasets];

  if (category && category !== 'All') {
    results = results.filter(d => d.category.toLowerCase() === category.toLowerCase());
  }

  if (frequency && frequency !== 'All') {
    results = results.filter(d => d.frequency.toLowerCase() === frequency.toLowerCase());
  }

  if (query) {
    results = results.filter(d =>
      d.title.toLowerCase().includes(query) ||
      d.subtitle.toLowerCase().includes(query) ||
      d.description.toLowerCase().includes(query) ||
      d.tags.some(t => t.toLowerCase().includes(query)) ||
      d.provider.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    total: results.length,
    datasets: results,
    metrics: {
      totalDatasets: runtimeDatasets.length,
      totalRecordsIndexed: '22.8M+',
      activeStreamingFeeds: runtimeDatasets.filter(d => d.frequency === 'Real-Time Streaming').length,
      avgApiLatencyMs: 14,
      dataQualityIndex: '99.8%'
    }
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    // Action 1: Ingest dataset into RAG engine (.data/csvs)
    if (action === 'ingest_rag') {
      const { datasetId } = body;
      const dataset = runtimeDatasets.find(d => d.id === datasetId);
      if (!dataset) {
        return NextResponse.json({ error: 'Dataset not found' }, { status: 404 });
      }

      const csvDir = path.join(process.cwd(), '.data', 'csvs');
      if (!fs.existsSync(csvDir)) {
        fs.mkdirSync(csvDir, { recursive: true });
      }

      const filePath = path.join(csvDir, `${dataset.id}.json`);
      fs.writeFileSync(filePath, JSON.stringify({
        docName: `${dataset.title} (DataHub)`,
        category: dataset.category,
        data: dataset.sampleRows,
        columns: dataset.columns.map(c => c.name),
        ingestedAt: new Date().toISOString(),
      }, null, 2), 'utf8');

      return NextResponse.json({
        success: true,
        message: `Dataset "${dataset.title}" successfully ingested into RAG Knowledge Base.`,
        docName: `${dataset.title} (DataHub)`
      });
    }

    // Action 2: Publish new dataset
    if (action === 'publish') {
      const { title, subtitle, category, frequency, format, provider, description, tags, sampleRows, columns } = body;
      if (!title || !category || !description) {
        return NextResponse.json({ error: 'Missing required dataset fields (title, category, description)' }, { status: 400 });
      }

      const newId = `custom-${Date.now().toString(36)}`;
      const newDataset: Dataset = {
        id: newId,
        title,
        subtitle: subtitle || `${category} verified telemetry feed`,
        category: category || 'Financial Markets',
        frequency: frequency || 'Daily',
        format: format || 'JSON',
        provider: provider || 'Enterprise Contributor',
        license: 'Enterprise Commercial',
        recordCount: `${(sampleRows?.length || 10).toLocaleString()} sample rows`,
        sizeBytes: '2.4 MB',
        qualityScore: 99.7,
        lastUpdated: 'Just now',
        pricingModel: 'Open Cleanroom',
        description,
        tags: Array.isArray(tags) ? tags : (tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
        columns: Array.isArray(columns) && columns.length > 0 ? columns : [
          { name: 'id', type: 'STRING', nullable: false, description: 'Row ID' },
          { name: 'timestamp', type: 'TIMESTAMP', nullable: false, description: 'Event time' },
          { name: 'value', type: 'NUMBER', nullable: false, description: 'Metric metric' },
        ],
        sampleRows: Array.isArray(sampleRows) && sampleRows.length > 0 ? sampleRows : [
          { id: '1', timestamp: new Date().toISOString(), value: 100 },
          { id: '2', timestamp: new Date().toISOString(), value: 105 }
        ],
        apiEndpoint: `https://api.klstr.ai/v1/datahub/custom/${newId}`
      };

      runtimeDatasets.unshift(newDataset);

      return NextResponse.json({
        success: true,
        dataset: newDataset,
        message: 'Dataset published successfully to klstrAIDataHub.'
      });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
