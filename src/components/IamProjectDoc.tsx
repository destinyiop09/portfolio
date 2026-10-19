/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface IamProjectDocProps {
  onBack?: () => void;
}

export const IamProjectDoc: React.FC<IamProjectDocProps> = ({ onBack }) => {
  useEffect(() => {
    document.title = 'Cloud Security with AWS IAM';
  }, []);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: '#1e293b', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div>
        <button
          onClick={handleBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            borderRadius: '0.5rem',
            fontWeight: 500,
            fontSize: '0.875rem',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '1.5rem',
          }}
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </button>
      </div>
      <div>
        edit me
      </div>
    </div>
  );
};
