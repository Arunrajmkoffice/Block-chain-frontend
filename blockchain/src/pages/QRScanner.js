// QRScanner.js
import React, { useRef, useState } from 'react';
import { QrReader } from 'react-qr-reader'; // Import QrReader specifically

const QRScanner = () => {
  const [result, setResult] = useState('');
  const qrRef = useRef(null);

  const handleScan = data => {
    if (data) {
      setResult(data);
    }
  }

  const handleError = err => {
    console.error(err);
  }

  const handleRetry = () => {
    setResult('');
    qrRef.current.openImageDialog();
  }

  return (
    <div>
      <QrReader
        ref={qrRef}
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      {result && (
        <div>
          <p>Scanned Result: {result}</p>
          <button onClick={handleRetry}>Scan Again</button>
        </div>
      )}
    </div>
  );
}

export default QRScanner;
