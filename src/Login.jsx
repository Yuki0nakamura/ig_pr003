import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LOGIN_CACHE_KEY = 'aiaLoginUser'
const TEMP_USERS = [
  {
    id: '1234',
    password: '1234',
    rank: 'manager',
    name: '伊藤',
  },
  {
    id: '0000',
    password: '0000',
    rank: 'agent',
    name: '高橋',
  },
]

function Login() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [modalState, setModalState] = useState({
    open: false,
    type: null,
    user: null,
  })
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()

    const matchedUser = TEMP_USERS.find(
      (user) => user.id === id && user.password === password,
    )

    if (!matchedUser) {
      setModalState({
        open: true,
        type: 'error',
        user: null,
      })
      return
    }

    setModalState({
      open: true,
      type: 'success',
      user: matchedUser,
    })
  }

  const handleCloseModal = () => {
    setModalState({
      open: false,
      type: null,
      user: null,
    })
  }

  const handleConfirmModal = () => {
    if (modalState.type !== 'success' || !modalState.user) {
      handleCloseModal()
      return
    }

    const loginData = {
      id: modalState.user.id,
      rank: modalState.user.rank,
      name: modalState.user.name,
      loggedAt: new Date().toISOString(),
    }

    sessionStorage.setItem(LOGIN_CACHE_KEY, JSON.stringify(loginData))
    navigate('/home', {
      state: { userId: modalState.user.id, userName: modalState.user.name },
    })
  }

  return (
    <main style={styles.pageWrap}>
      <section style={styles.loginPanel} aria-label="AIA login">
        <header style={styles.panelHeader}>
          <h1 style={styles.title}>AIA</h1>
          <p style={styles.subtitle}>見積書管理</p>
        </header>

        <form style={styles.form} onSubmit={handleLogin}>
          <label style={styles.label} htmlFor="employeeNumber">
            社員番号
          </label>
          <input
            onChange={(e) => {
              setId(e.target.value)
            }}
            value={id}
            id="employeeNumber"
            name="employeeNumber"
            style={styles.input}
            type="text"
            placeholder="0001"
          />

          <label style={styles.label} htmlFor="password">
            パスワード
          </label>
          <input
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            value={password}
            id="password"
            name="password"
            style={styles.input}
            type="password"
            placeholder="****"
          />

          <button type="submit" style={styles.button}>
            ログイン
          </button>
        </form>
      </section>

      {modalState.open ? (
        <div style={styles.modalOverlay} role="dialog" aria-modal="true">
          <div style={styles.modalCard}>
            <h3 style={styles.modalTitle}>
              {modalState.type === 'error' ? 'エラーメッセージ' : '認証成功'}
            </h3>
            <p style={styles.modalDescription}>
              {modalState.type === 'error' ? '認証失敗' : '認証成功'}
            </p>

            <div style={styles.modalButtonRow}>
              <button
                type="button"
                style={styles.modalCancelButton}
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                type="button"
                style={
                  modalState.type === 'error'
                    ? styles.modalErrorActionButton
                    : styles.modalSuccessActionButton
                }
                onClick={handleConfirmModal}
              >
                {modalState.type === 'error' ? '戻る' : '確認'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}

const styles = {
  pageWrap: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    boxSizing: 'border-box',
  },
  loginPanel: {
    width: 'min(720px, 100%)',
    minHeight: 'min(540px, calc(100vh - 32px))',
    background: '#efefef',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #d7d7d7',
    borderRadius: '10px',
  },
  panelHeader: {
    marginTop: '56px',
    textAlign: 'center',
  },
  title: {
    margin: 0,
    color: '#ff0000',
    fontSize: 'clamp(48px, 8vw, 72px)',
    fontWeight: 500,
    letterSpacing: '0.05em',
    lineHeight: 1,
    textShadow: '1px 1px 0 #222',
  },
  subtitle: {
    margin: '12px 0 0',
    color: '#111111',
    fontSize: 'clamp(22px, 3.5vw, 24px)',
    fontWeight: 700,
  },
  form: {
    width: 'min(360px, calc(100% - 40px))',
    marginTop: '64px',
    display: 'grid',
    gap: '12px',
  },
  label: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 700,
    color: '#383838',
    letterSpacing: '0.02em',
  },
  input: {
    height: '42px',
    border: '1px solid #ababab',
    borderRadius: '8px',
    padding: '0 12px',
    background: '#efefef',
    fontSize: '16px',
    color: '#242424',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    marginTop: '22px',
    height: '50px',
    border: 0,
    borderRadius: '999px',
    background: '#1789eb',
    color: '#ffffff',
    fontSize: '18px',
    fontWeight: 700,
    letterSpacing: '0.06em',
    cursor: 'pointer',
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
    width: 'min(360px, 100%)',
    backgroundColor: '#efefef',
    border: '1px solid #e2e2e2',
    borderRadius: '28px',
    padding: '20px 16px 16px',
    boxSizing: 'border-box',
  },
  modalTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 700,
    color: '#151515',
    lineHeight: 1.2,
  },
  modalDescription: {
    margin: '18px 4px 28px',
    fontSize: '16px',
    fontWeight: 700,
    color: '#666',
    lineHeight: 1.2,
  },
  modalButtonRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  modalCancelButton: {
    height: '46px',
    border: 'none',
    borderRadius: '999px',
    backgroundColor: '#cbcbcb',
    color: '#111111',
    fontSize: '16px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  modalErrorActionButton: {
    height: '46px',
    border: 'none',
    borderRadius: '999px',
    backgroundColor: '#ff1f50',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 700,
    cursor: 'pointer',
  },
  modalSuccessActionButton: {
    height: '46px',
    border: 'none',
    borderRadius: '999px',
    backgroundColor: '#1d80e5',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 500,
    cursor: 'pointer',
  },
}


export default Login
