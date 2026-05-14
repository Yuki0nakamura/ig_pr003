import React from 'react';
import { useNavigate } from 'react-router-dom';

const imageUrl = 
[
    "https://imgv2-2-f.scribdassets.com/img/document/749185844/original/441f6c24fe/1?v=1",
    "https://imgv2-1-f.scribdassets.com/img/document/674663039/original/f183d3dbba/1703189220?v=1",
    "https://imgv2-2-f.scribdassets.com/img/document/657902131/original/31a04e91d1/1713190123?v=1"
];

const LOGIN_CACHE_KEY = 'aiaLoginUser';

function Preview() {
  const navigate = useNavigate();

  // 로그인 캐시에서 rank 정보 가져오기
  const getCachedUser = () => {
    try {
      const raw = sessionStorage.getItem(LOGIN_CACHE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };
  const cachedUser = getCachedUser();
  const isManager = cachedUser?.rank === 'manager';

  const [showImage, setShowImage] = React.useState(false);
  const [selectedFormat, setSelectedFormat] = React.useState(0);
  const [selectedFormatConfirmed, setSelectedFormatConfirmed] = React.useState(0);
  const [modal, setModal] = React.useState({ open: false, message: '' });

  const handleBack = () => {
    navigate('/edit');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    setModal({ open: true, message: '保存が完了しました。' });
  };

  const handleSend = () => {
    setModal({ open: true, message: '送信が完了しました。' });
  };

  const handleClearFormat = () => {
    setShowImage(false);
  };

  const handleApplyFormat = () => {
    setShowImage(true);
    setSelectedFormatConfirmed(selectedFormat);
  };

  const handleCloseModal = () => {
    setModal({ open: false, message: '' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <h1 style={styles.title}>見積書のプレビュー</h1>
        <button style={styles.backButton} onClick={handleBack}>戻る</button>
      </div>
      <div style={styles.header}>
        <div style={styles.leftHeader}>
          <select onChange={(e)=>setSelectedFormat(e.target.value)} style={styles.dropdown}>
            <option value={0}>書式 1</option>
            <option value={1}>書式 2</option>
            <option value={2}>書式 3</option>
          </select>
          <button style={styles.applyButton} onClick={handleApplyFormat}>書式適用</button>
          <button style={styles.clearButton} onClick={handleClearFormat}>✕</button>
        </div>
        <div style={styles.rightHeader}>
          <button style={styles.printButton} onClick={handlePrint}>🖨️</button>
          <button style={styles.saveButton} onClick={handleSave}>▶ 保存</button>
          {isManager && (
            <button style={styles.sendButton} onClick={handleSend}>▶ 送信</button>
          )}
        </div>
      </div>
      <div style={styles.content}>
        {showImage && (
          <img 
            src={imageUrl[selectedFormatConfirmed]}
            alt="Preview" 
            style={styles.image}
          />
        )}
      </div>
      {/* 완료 모달 */}
      {modal.open && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(20, 28, 45, 0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            width: 'min(320px, 100%)',
            backgroundColor: '#efefef',
            border: '1px solid #e2e2e2',
            borderRadius: '24px',
            padding: '24px 16px 16px',
            boxSizing: 'border-box',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#222', marginBottom: '18px' }}>{modal.message}</div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button style={{ padding: '8px 24px', border: 'none', borderRadius: '999px', backgroundColor: '#1d80e5', color: '#fff', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }} onClick={handleCloseModal}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    fontFamily: "'Yu Gothic UI', 'Meiryo', sans-serif",
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
  },
  title: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    padding: '8px 16px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  header: {
    flexShrink: 0,
    backgroundColor: '#fff',
    padding: '20px 24px',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    backgroundColor: '#f5f5f5', // Ensure consistent background color
  },
  leftHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  rightHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  dropdown: {
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #aaa',
    borderRadius: '4px',
  },
  applyButton: {
    padding: '8px 16px',
    backgroundColor: '#444',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  clearButton: {
    padding: '8px 16px',
    //backgroundColor: '#dc3545',
    color: '#333',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  printButton: {
    padding: '8px 16px',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  saveButton: {
    padding: '8px 16px',
    backgroundColor: '#ffc107',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  sendButton: {
    padding: '8px 16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default Preview;