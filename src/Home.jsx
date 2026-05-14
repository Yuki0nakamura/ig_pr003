import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const LOGIN_CACHE_KEY = 'aiaLoginUser'

function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedQuoteId, setSelectedQuoteId] = useState(null)
  const [modal, setModal] = useState({ open: false, type: '', message: '' })
  const handleShowSelectModal = () => {
    setModal({ open: true, type: 'select', message: '見積書を選択してください。' })
  }

  const handleShowDeleteModal = () => {
    setModal({ open: true, type: 'delete', message: '削除が完了しました。' })
  }

  const handleShowSendModal = () => {
    setModal({ open: true, type: 'send', message: '送信が完了しました。' })
  }

  const handleCloseModal = () => {
    setModal({ open: false, type: '', message: '' })
  }

  const getCachedUser = () => {
    try {
      const raw = sessionStorage.getItem(LOGIN_CACHE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }

    const handlePrint = () => {
    window.print();
    };


  const cachedUser = getCachedUser()
  const userId = cachedUser?.id || location.state?.userId || 'ユーザー'
  const userName = cachedUser?.name || location.state?.userName || 'ユーザー'
  const isManager = cachedUser?.rank === 'manager'
  const rankLabel = cachedUser?.rank === 'manager' ? 'マネージャー' : 'エージェント'

  const mockQuotes = [
    { id: 'ABCD0001', customer: '田中 様', creator: '高橋', status: 'Draft', date: '2026/01/01' },
    { id: 'ABCD0002', customer: '田中 様', creator: '高橋', status: 'Draft', date: '2026/01/02' },
    { id: 'ABCD0003', customer: '田中 様', creator: '高橋', status: 'Draft', date: '2026/01/02' },
    { id: 'ABCD0004', customer: '田中 様', creator: '高橋', status: 'Saved', date: '2026/01/02' },
    { id: 'ABCD0005', customer: '田中 様', creator: '高橋', status: 'Draft', date: '2026/01/02' },
    { id: 'ABCD0006', customer: '田中 様', creator: '高橋', status: 'Sent', date: '2026/01/02' },
    { id: 'ABCD0007', customer: '田中 様', creator: '高橋', status: 'Saved', date: '2026/01/02' },
  ]

  const handleLogout = () => {
    sessionStorage.removeItem('aiaLoginUser')
    navigate('/')
  }

  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: '4px 12px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 600,
    }
    switch (status) {
      case 'Draft':
        return { ...baseStyle, backgroundColor: '#e8e8e8', color: '#666666' }
      case 'Saved':
        return { ...baseStyle, backgroundColor: '#fff3cd', color: '#856404' }
      case 'Sent':
        return { ...baseStyle, backgroundColor: '#d4edda', color: '#155724' }
      default:
        return { ...baseStyle, backgroundColor: '#f0f0f0', color: '#666666' }
    }
  }

  const handleStatusFilter = (status) => {
    setSelectedStatus(status)
  }

  const getFilteredQuotes = () => {
    if (selectedStatus === 'All') {
      return mockQuotes
    }
    return mockQuotes.filter((quote) => quote.status === selectedStatus)
  }

  const filteredQuotes = getFilteredQuotes()

  const getQuoteTitle = (id) => {
    const num = id.slice(-4)
    return `見積書_${num}`
  }

  const handleSelectQuote = (id) => {
    setSelectedQuoteId(selectedQuoteId === id ? null : id)
  }

  return (
    <div style={styles.container}>
      {/* 左サイドバー */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>AIA</div>

        <div style={styles.userInfo}>
          <div style={styles.userIcon}>👤</div>
          <div style={styles.userName}>{rankLabel}</div>
          <div style={styles.userEmail}>{userName} ({userId})</div>
        </div>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          ログアウト
        </button>
        <button style={styles.actionBtn} onClick={() => navigate('/edit')}>見積新規作成</button>
        <button style={styles.actionBtn2}>送信履歴</button>

        <div style={styles.instructionBox}>
          <div style={styles.instructionTitle}>見積書を選択</div>
          <div style={styles.instructionText}>
            見積書を1件選択してください。操作が選択できます。
          </div>
        </div>

        <button
          style={{
            ...styles.dangerBtn,
            opacity: selectedQuoteId ? 1 : 0.5,
            pointerEvents: selectedQuoteId ? 'auto' : 'auto',
          }}
          onClick={() => {
            if (!selectedQuoteId) {
              handleShowSelectModal()
            } else {
              handleShowDeleteModal()
            }
          }}
        >削除</button>
        <button
          style={{
            ...styles.normalBtn,
            opacity: selectedQuoteId ? 1 : 0.5,
            pointerEvents: selectedQuoteId ? 'auto' : 'auto',
          }}
          onClick={() => {
            if (!selectedQuoteId) {
              handleShowSelectModal()
            } else {
              handlePrint()
            }
          }}
        >プリント</button>
        {isManager ? (
          <button
            style={{
              ...styles.normalBtn22,
              opacity: selectedQuoteId ? 1 : 0.5,
              pointerEvents: selectedQuoteId ? 'auto' : 'auto',
            }}
            onClick={() => {
              if (!selectedQuoteId) {
                handleShowSelectModal()
              } else {
                handleShowSendModal()
              }
            }}
          >送信</button>
        ) : null}
        <button
          style={{
            ...styles.normalBtn,
            opacity: selectedQuoteId ? 1 : 0.5,
            pointerEvents: selectedQuoteId ? 'auto' : 'auto',
          }}
          onClick={() => {
            if (!selectedQuoteId) {
              handleShowSelectModal()
            } else {
              navigate('/edit')
            }
          }}
        >編集</button>
      </aside>

      {/* メインコンテンツ */}
      <main style={styles.mainContent}>
        {/* フィルターエリア */}
        <div style={styles.filterArea}>
            <label style={styles.filterLabel}>作成日</label>
            <div style={{marginRight:0}}/>
            <label style={styles.filterLabel}>From:</label>
            <input type="date" style={styles.filterInput} defaultValue="2026-01-01" />
            <label style={styles.filterLabel}>Until:</label>
            <input type="date" style={styles.filterInput} defaultValue="2026-01-02" />
            <div style={{marginRight:36}}/>
            <button style={styles.searchBtn}>検索</button>
        </div>

        {/* 見積ID検索エリア */}
        <div style={styles.searchIdArea}>
          <input type="text" style={styles.searchInput} placeholder="見積ID" />
          <input type="text" style={styles.searchInput} placeholder="顧客名" />
          <input type="text" style={styles.searchInput} placeholder="作成者" />
          <div style={styles.statusButtons}>
            <button
              style={{
                ...styles.statusBtn,
                backgroundColor: selectedStatus === 'All' ? '#333' : '#fff',
                color: selectedStatus === 'All' ? '#fff' : '#333',
              }}
              onClick={() => handleStatusFilter('All')}
            >
              All
            </button>
            <button
              style={{
                ...styles.statusBtn,
                backgroundColor: selectedStatus === 'Draft' ? '#e8e8e8' : '#fff',
                fontWeight: selectedStatus === 'Draft' ? 'bold' : '600',
              }}
              onClick={() => handleStatusFilter('Draft')}
            >
              Draft
            </button>
            <button
              style={{
                ...styles.statusBtn,
                backgroundColor: selectedStatus === 'Saved' ? '#fff3cd' : '#fff',
                fontWeight: selectedStatus === 'Saved' ? 'bold' : '600',
              }}
              onClick={() => handleStatusFilter('Saved')}
            >
              Saved
            </button>
            <button
              style={{
                ...styles.statusBtn,
                backgroundColor: selectedStatus === 'Sent' ? '#d4edda' : '#fff',
                fontWeight: selectedStatus === 'Sent' ? 'bold' : '600',
              }}
              onClick={() => handleStatusFilter('Sent')}
            >
              Sent
            </button>
          </div>
        </div>

        {/* リスト */}
        <div style={styles.listWrapper}>
          {filteredQuotes.map((quote) => (
            <div
              key={quote.id}
              style={{
                ...styles.listItem,
                backgroundColor: selectedQuoteId === quote.id ? '#e8f4fd' : '#fff',
                borderLeft: selectedQuoteId === quote.id ? '4px solid #1d80e5' : '4px solid transparent',
              }}
              onClick={() => handleSelectQuote(quote.id)}
            >
              <div style={styles.listItemCheckbox}>
                <div
                  style={{
                    ...styles.checkbox,
                    borderColor: selectedQuoteId === quote.id ? '#1d80e5' : '#ccc',
                    backgroundColor: selectedQuoteId === quote.id ? '#1d80e5' : '#fff',
                  }}
                >
                  {selectedQuoteId === quote.id && <span style={styles.checkmark}>✓</span>}
                </div>
              </div>
              
              <div style={styles.listItemContent}>
                <div style={styles.listItemHeader}>
                  <div style={styles.listItemTitle}>
                    {getQuoteTitle(quote.id)} | {quote.customer}
                  </div>
                  <div style={styles.listItemMeta}>
                    {quote.date} (金) 作成 | {quote.creator}
                  </div>
                </div>
              </div>

              <div style={styles.listItemRight}>
                <div style={styles.listItemId}>ID: {quote.id}</div>
                <span style={getStatusStyle(quote.status)}>{quote.status}</span>
              </div>

              <div style={styles.listItemArrow}>›</div>
            </div>
          ))}
        </div>

        {/* ページネーション */}
        <div style={styles.pagination}>
          <button style={styles.paginationBtn}>&lt;</button>
          <div style={styles.pageNumbers}>
            <span style={styles.pageNumber}>1</span>
            <span style={styles.pageNumber}>2</span>
            <span style={styles.pageNumber}>3</span>
            <span style={styles.pageNumber}>4</span>
            <span style={styles.pageNumber}>5</span>
            <span style={styles.pageNumber}>6</span>
            <span style={styles.pageNumber}>7</span>
          </div>
          <button style={styles.paginationBtn}>&gt;</button>
        </div>

        {/* 모달 */}
        {modal.open && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalCard}>
              <div style={styles.modalMessage}>{modal.message}</div>
              <div style={styles.modalButtonRow}>
                <button style={styles.modalButton} onClick={handleCloseModal}>OK</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#e8ecf1',
    fontFamily: "'Yu Gothic UI', 'Meiryo', sans-serif",
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    overflowY: 'auto',
    borderRight: '1px solid #ddd',
  },
  logo: {
    fontSize: '54px',
    fontWeight: 'bold',
    color: '#ff0000',
    textAlign: 'center',
    marginBottom: '12px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '6px',
    backgroundColor: '#e8e8e8',
    borderRadius: '8px',
  },
  userIcon: {
    fontSize: '24px',
  },
  userName: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: '12px',
    color: '#666',
  },
  logoutBtn: {
    padding: '10px 16px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#ff6666',
    cursor: 'pointer',
  },
  actionBtn: {
    padding: '10px 16px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    color: 'blue',
    cursor: 'pointer',
  },
    actionBtn2: {
    padding: '10px 16px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    color: 'green',
    cursor: 'pointer',
  },
  instructionBox: {
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '12px',
  },
  instructionTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '6px',
    color: '#333',
  },
  instructionText: {
    color: '#666',
    lineHeight: '1.4',
  },
  dangerBtn: {
    padding: '10px 16px',
    backgroundColor: '#ffcccc',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#ff3333',
    cursor: 'pointer',
  },
  normalBtn: {
    padding: '10px 16px',
    backgroundColor: '#ddd',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#333',
    cursor: 'pointer',
  },
    normalBtn22: {
    padding: '10px 16px',
    backgroundColor: '#ddd',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    color: 'green',
    cursor: 'pointer',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
  },
  filterArea: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    marginBottom: '16px',
    backgroundColor: '#fff',
    padding: '12px',
    borderRadius: '6px',
    justifyContent: 'flex-start',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: '12px',
  },
  filterLabel: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#333',
    
  },
  filterInput: {
    padding: '8px 10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '12px',
  },
  searchBtn: {
    padding: '8px 16px',
    backgroundColor: '#999',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    alignSelf: 'center',
  },
  searchIdArea: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    marginBottom: '16px',
    backgroundColor: '#fff',
    padding: '12px',
    borderRadius: '6px',
  },
  searchInput: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '12px',
    width: '120px',
  },
  statusButtons: {
    display: 'flex',
    gap: '8px',
    marginLeft: 'auto',
  },
  statusBtn: {
    padding: '6px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  listWrapper: {
    backgroundColor: '#fff',
    borderRadius: '6px',
    overflow: 'hidden',
    marginBottom: '16px',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '14px 16px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  listItemCheckbox: {
    marginRight: '12px',
    flexShrink: 0,
  },
  checkbox: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: '2px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  checkmark: {
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  listItemContent: {
    flex: 1,
  },
  listItemHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  listItemTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
  listItemMeta: {
    fontSize: '12px',
    color: '#999',
  },
  listItemRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginRight: '12px',
    flexShrink: 0,
  },
  listItemId: {
    fontSize: '12px',
    color: '#999',
  },
  listItemArrow: {
    fontSize: '18px',
    color: '#ccc',
    flexShrink: 0,
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    backgroundColor: '#fff',
    borderRadius: '6px',
  },
  paginationBtn: {
    padding: '6px 12px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  pageNumbers: {
    display: 'flex',
    gap: '6px',
  },
  pageNumber: {
    padding: '4px 8px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  pageInfo: {
    fontSize: '12px',
    color: '#666',
    marginLeft: '8px',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(20, 28, 45, 0.18)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    zIndex: 1000,
  },
  modalCard: {
    width: 'min(320px, 100%)',
    backgroundColor: '#efefef',
    border: '1px solid #e2e2e2',
    borderRadius: '24px',
    padding: '24px 16px 16px',
    boxSizing: 'border-box',
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#222',
    marginBottom: '18px',
  },
  modalButtonRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
  },
  modalButton: {
    padding: '8px 24px',
    border: 'none',
    borderRadius: '999px',
    backgroundColor: '#1d80e5',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 700,
    cursor: 'pointer',
  },
}

export default Home
