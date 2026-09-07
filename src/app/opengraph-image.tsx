import { ImageResponse } from 'next/og';

export const alt = 'klstr.ai - Transform Your Business with AI-Driven Digital Solutions';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#ffbf23',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top Logo */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              fontWeight: 900,
              color: '#000000',
              letterSpacing: '-2px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            klstr.ai
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="#000000"
              style={{ marginLeft: '12px' }}
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: 'rgba(0, 0, 0, 0.75)',
              marginTop: '4px',
            }}
          >
            Innovating AI Solutions
          </div>
        </div>

        {/* Middle Main Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '950px',
          }}
        >
          <div
            style={{
              fontSize: '52px',
              fontWeight: 800,
              color: '#000000',
              lineHeight: 1.15,
              letterSpacing: '-1px',
            }}
          >
            Transform Your Business with AI-Driven Digital Solutions
          </div>
          <div
            style={{
              fontSize: '26px',
              fontWeight: 500,
              color: 'rgba(0, 0, 0, 0.8)',
              marginTop: '20px',
              lineHeight: 1.4,
            }}
          >
            Enterprise AI • SLMs • Tiny LMs • Agentic OS • DataHub
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: '20px',
            borderTop: '2px solid rgba(0, 0, 0, 0.15)',
          }}
        >
          <div
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#000000',
            }}
          >
            www.klstr.ai
          </div>
          <div
            style={{
              background: '#000000',
              color: '#ffffff',
              padding: '12px 28px',
              borderRadius: '8px',
              fontSize: '20px',
              fontWeight: 700,
            }}
          >
            Book a Demo
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
