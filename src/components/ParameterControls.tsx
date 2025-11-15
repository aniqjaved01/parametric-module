import React, { useState, useEffect } from 'react';
import { useModule } from '../context/ModuleContext';

export function ParameterControls() {
  const { params, updateParams } = useModule();
  const [widthInput, setWidthInput] = useState<string>(params.width.toString());
  const [heightInput, setHeightInput] = useState<string>(params.height.toString());
  const [widthError, setWidthError] = useState<string>('');
  const [heightError, setHeightError] = useState<string>('');

  // Sync local state when params change externally
  useEffect(() => {
    setWidthInput(params.width.toString());
  }, [params.width]);

  useEffect(() => {
    setHeightInput(params.height.toString());
  }, [params.height]);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setWidthInput(inputValue);

    // Allow empty input
    if (inputValue === '' || inputValue === '-') {
      setWidthError('');
      return;
    }

    const value = parseFloat(inputValue);
    
    // Check if it's a valid number
    if (isNaN(value)) {
      setWidthError('Please enter a valid number');
      return;
    }

    // Validate minimum value
    if (value <= 5) {
      setWidthError('Value must be greater than 5');
      return;
    }

    // Valid value - update params and clear error
    setWidthError('');
    updateParams({ width: value });
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setHeightInput(inputValue);

    // Allow empty input
    if (inputValue === '' || inputValue === '-') {
      setHeightError('');
      return;
    }

    const value = parseFloat(inputValue);
    
    // Check if it's a valid number
    if (isNaN(value)) {
      setHeightError('Please enter a valid number');
      return;
    }

    // Validate minimum value
    if (value <= 5) {
      setHeightError('Value must be greater than 5');
      return;
    }

    // Valid value - update params and clear error
    setHeightError('');
    updateParams({ height: value });
  };

  const handleFinishChange = (finish: 'metal' | 'wood') => {
    updateParams({ finish });
  };

  return (
    <div style={{ padding: '32px', height: '100%' }}>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ 
          marginTop: 0, 
          marginBottom: '8px', 
          color: '#1a1a1a',
          fontSize: '24px',
          fontWeight: 700,
          letterSpacing: '-0.3px'
        }}>
          Module Parameters
        </h2>
        <p style={{ 
          margin: 0, 
          color: '#6b7280', 
          fontSize: '14px' 
        }}>
          Adjust dimensions and finish to customize your module
        </p>
      </div>
      
      <div style={{ marginBottom: '28px' }}>
        <label
          htmlFor="width"
          style={{
            display: 'block',
            marginBottom: '10px',
            fontWeight: 600,
            color: '#374151',
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Width (mm)
        </label>
        <div style={{ position: 'relative' }}>
          <input
            id="width"
            type="text"
            inputMode="decimal"
            value={widthInput}
            onChange={handleWidthChange}
            onBlur={() => {
              // On blur, if empty or invalid, reset to current valid value
              if (widthInput === '' || widthError) {
                setWidthInput(params.width.toString());
                setWidthError('');
              }
            }}
            style={{
              width: '100%',
              padding: '14px 16px',
              fontSize: '16px',
              border: `2px solid ${widthError ? '#ef4444' : '#e5e7eb'}`,
              borderRadius: '10px',
              boxSizing: 'border-box',
              backgroundColor: '#fafafa',
              color: '#1a1a1a',
              transition: 'all 0.2s ease',
              fontWeight: 500,
            }}
          />
          {widthError && (
            <div style={{
              marginTop: '6px',
              fontSize: '12px',
              color: '#ef4444',
              fontWeight: 500,
            }}>
              {widthError}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginBottom: '28px' }}>
        <label
          htmlFor="height"
          style={{
            display: 'block',
            marginBottom: '10px',
            fontWeight: 600,
            color: '#374151',
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Height (mm)
        </label>
        <div style={{ position: 'relative' }}>
          <input
            id="height"
            type="text"
            inputMode="decimal"
            value={heightInput}
            onChange={handleHeightChange}
            onBlur={() => {
              // On blur, if empty or invalid, reset to current valid value
              if (heightInput === '' || heightError) {
                setHeightInput(params.height.toString());
                setHeightError('');
              }
            }}
            style={{
              width: '100%',
              padding: '14px 16px',
              fontSize: '16px',
              border: `2px solid ${heightError ? '#ef4444' : '#e5e7eb'}`,
              borderRadius: '10px',
              boxSizing: 'border-box',
              backgroundColor: '#fafafa',
              color: '#1a1a1a',
              transition: 'all 0.2s ease',
              fontWeight: 500,
            }}
          />
          {heightError && (
            <div style={{
              marginTop: '6px',
              fontSize: '12px',
              color: '#ef4444',
              fontWeight: 500,
            }}>
              {heightError}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '12px',
            fontWeight: 600,
            color: '#374151',
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Finish
        </label>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => handleFinishChange('metal')}
            style={{
              flex: 1,
              padding: '16px',
              fontSize: '15px',
              fontWeight: 600,
              border: `2px solid ${params.finish === 'metal' ? '#14b8a6' : '#e5e7eb'}`,
              borderRadius: '10px',
              backgroundColor: params.finish === 'metal' 
                ? 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)' 
                : 'white',
              background: params.finish === 'metal' 
                ? 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)' 
                : 'white',
              color: params.finish === 'metal' ? 'white' : '#6b7280',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: params.finish === 'metal' 
                ? '0 4px 12px rgba(13, 148, 136, 0.3)' 
                : 'none',
            }}
          >
            Metal
          </button>
          <button
            onClick={() => handleFinishChange('wood')}
            style={{
              flex: 1,
              padding: '16px',
              fontSize: '15px',
              fontWeight: 600,
              border: `2px solid ${params.finish === 'wood' ? '#8b4513' : '#e5e7eb'}`,
              borderRadius: '10px',
              backgroundColor: params.finish === 'wood' 
                ? '#8b4513' 
                : 'white',
              color: params.finish === 'wood' ? 'white' : '#6b7280',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: params.finish === 'wood' 
                ? '0 4px 12px rgba(139, 69, 19, 0.3)' 
                : 'none',
            }}
          >
            Wood
          </button>
        </div>
      </div>

      <div
        style={{
          marginTop: '32px',
          padding: '24px',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
        }}
      >
        <div style={{ 
          marginBottom: '16px',
          fontSize: '12px',
          fontWeight: 600,
          color: '#6b7280',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          Current Configuration
        </div>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px',
          fontSize: '15px',
          color: '#1a1a1a',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#6b7280', fontWeight: 500 }}>Width:</span>
            <span style={{ fontWeight: 700, color: '#14b8a6' }}>{params.width} mm</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#6b7280', fontWeight: 500 }}>Height:</span>
            <span style={{ fontWeight: 700, color: '#14b8a6' }}>{params.height} mm</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#6b7280', fontWeight: 500 }}>Finish:</span>
            <span style={{ 
              fontWeight: 700, 
              color: params.finish === 'metal' ? '#14b8a6' : '#8b4513',
              textTransform: 'capitalize'
            }}>
              {params.finish}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

