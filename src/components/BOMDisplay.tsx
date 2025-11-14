import React, { useState } from 'react';
import { useModule } from '../context/ModuleContext';

export function BOMDisplay() {
  const { bom } = useModule();
  const [copied, setCopied] = useState(false);

  const bomJson = JSON.stringify(bom, null, 2);
  const totalParts = bom.reduce((sum, item) => sum + item.quantity, 0);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bomJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h2 style={{ 
            margin: 0, 
            color: '#1a1a1a',
            fontSize: '24px',
            fontWeight: 700,
            letterSpacing: '-0.3px'
          }}>
            Bill of Materials
          </h2>
          <button
            onClick={handleCopy}
            style={{
              padding: '10px 20px',
              background: copied 
                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                : 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              boxShadow: copied 
                ? '0 4px 12px rgba(16, 185, 129, 0.3)' 
                : '0 4px 12px rgba(13, 148, 136, 0.3)',
              transition: 'all 0.3s ease',
            }}
          >
            {copied ? '✓ Copied!' : 'Copy JSON'}
          </button>
        </div>
        <p style={{ 
          margin: 0, 
          color: '#6b7280', 
          fontSize: '14px' 
        }}>
          Complete parts list for your module configuration
        </p>
      </div>

      <div
        style={{
          flex: 1,
          overflow: 'auto',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          border: '1px solid #334155',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3)',
        }}
      >
        {bom.length === 0 ? (
          <div style={{ 
            color: '#94a3b8', 
            fontStyle: 'italic',
            textAlign: 'center',
            padding: '40px 20px',
            fontSize: '15px'
          }}>
            No parts in BOM
          </div>
        ) : (
          <pre
            style={{
              margin: 0,
              fontSize: '13px',
              lineHeight: '1.8',
              fontFamily: '"Fira Code", "Monaco", "Menlo", "Courier New", monospace',
              color: '#e2e8f0',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {bomJson}
          </pre>
        )}
      </div>

      <div style={{ 
        marginTop: '24px',
        padding: '20px',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <div style={{ 
            fontSize: '12px', 
            fontWeight: 600,
            color: '#6b7280',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '6px'
          }}>
            Total Parts
          </div>
          <div style={{ 
            fontSize: '24px', 
            fontWeight: 700,
            color: '#14b8a6'
          }}>
            {totalParts}
          </div>
        </div>
        <div style={{ 
          width: '1px', 
          height: '40px', 
          backgroundColor: '#e5e7eb' 
        }} />
        <div>
          <div style={{ 
            fontSize: '12px', 
            fontWeight: 600,
            color: '#6b7280',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '6px'
          }}>
            Part Types
          </div>
          <div style={{ 
            fontSize: '24px', 
            fontWeight: 700,
            color: '#0d9488'
          }}>
            {bom.length}
          </div>
        </div>
      </div>
    </div>
  );
}

