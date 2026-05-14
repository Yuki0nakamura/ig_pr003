import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LOGIN_CACHE_KEY = 'aiaLoginUser'

function Edit() {
  const navigate = useNavigate()

  // 로그인 캐시에서 rank 정보 가져오기
  const getCachedUser = () => {
    try {
      const raw = sessionStorage.getItem(LOGIN_CACHE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }
  const cachedUser = getCachedUser()
  const isManager = cachedUser?.rank === 'manager'
  const [formData, setFormData] = useState({
    title: '見積書のタイトル',
    date: '2026/01/01',
    creator: '高橋',
    lastName: '',
    firstName: '',
    gender: '',
    birthDate: '',
    phone: '',
    email: '',
    street: '',
    aptSuite: '',
    city: '',
    state: '',
    zip: '',
    licenseNumber: '',
    licenseDate: '',
    driversInfo: [],
    accidentInfo: [],
    // VIN and Vehicle Info
    vin: '',
    vinList: ['VIN 001', 'VIN 002', 'VIN 003'],
    maker: '',
    model: '',
    year: '',
    trimLevel: '',
    bodyType: '',
    ownership: '',
    annualMileage: '',
    usage: '',
    commute: '',
    businessUse: '',
    parkingLocation: '',
    parkingType: '',
    // Insurance Info
    coverage: '',
    deductible: '',
    carInsurance: '',
    carInsuranceAmount: '',
    compInsurance: '',
    compInsuranceAmount: '',
    noFaultInsurance: '',
    companyInsurance: '',
    medicalInsurance: '',
    roadService: '',
    contractType: '',
    contractDate: '',
    policyHolder: '',
    insuranceCompany: '',
    calculationResult: {
      premium: '見積中...',
      status: '',
    },
  })

  const handleClose = () => {
    navigate('/home')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }


  // 모달 상태
  const [modal, setModal] = useState({ open: false, message: '' })

  const handleSaveDraft = () => {
    setModal({ open: true, message: '下書き保存が完了しました。' })
  }

  const handleSave = () => {
    setModal({ open: true, message: '保存が完了しました。' })
  }

  const handleSend = () => {
    setModal({ open: true, message: '送信が完了しました。' })
  }

  const handleCloseModal = () => {
    setModal({ open: false, message: '' })
  }

  const handleAddDriver = () => {
    setFormData({
      ...formData,
      driversInfo: [...formData.driversInfo, { name: '', licenseNumber: '' }],
    })
  }

  const handlePreview = () => {
    navigate('/preview')
  }

  return (
    <div style={styles.container}>
      {/* ヘッダー */}
      <div style={styles.header}>
        <div style={styles.headerTitle}>
          <h1 style={styles.title}>{formData.title}</h1>
          <div style={styles.meta}>
            <span>{formData.date} (木) 作成</span>
            <span style={{ marginLeft: '16px' }}>{formData.creator}</span>
          </div>
        </div>

        <div style={styles.headerActions}>
          <button style={styles.previewBtn} onClick={handlePreview}>
            ▶ プレビュー
          </button>
          <div style={styles.actionButtons}>
            <button style={styles.draftBtn} onClick={handleSaveDraft}>下書きで保存</button>
            <button style={styles.saveBtn} onClick={handleSave}>保存</button>
            {isManager && (
              <button style={styles.sendBtn} onClick={handleSend}>▶ 送信</button>
            )}
          </div>
          <button style={styles.closeBtn} onClick={handleClose}>
            ✕
          </button>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div style={styles.content}>
        {/* 左パネル */}
        <div style={styles.leftPanel}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>氏名・性別・生年月日</h3>

            <div style={styles.formGroup}>
              <label style={styles.label}>氏名（名）</label>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Detail"
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>氏名（姓）</label>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Detail"
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>性別</label>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Detail"
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>生年月日</label>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Detail"
                />
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>連絡先・住所</h3>

            <div style={styles.formGroup}>
              <label style={styles.label}>電話番号</label>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Detail"
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>メールアドレス</label>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Detail"
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>住所1（Street）</label>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Detail"
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>住所2（Apt/Suite）</label>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  name="aptSuite"
                  value={formData.aptSuite}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Detail"
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>市区町村（City）</label>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Detail"
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>州（State）</label>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Detail"
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>郵便番号（ZIP）</label>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Detail"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 中央パネル */}
        <div style={styles.centerPanel}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>免許情報</h3>

            <div style={styles.formGroup}>
              <label style={styles.label}>運転免許番号</label>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Detail"
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>免許取得日</label>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  name="licenseDate"
                  value={formData.licenseDate}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Detail"
                />
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>ドライバー追加</h3>

            {formData.driversInfo.length === 0 ? (
              <div style={styles.emptyDriver}>
                <div style={styles.emptyDriverBox} />
              </div>
            ) : (
              formData.driversInfo.map((driver, index) => (
                <div key={index} style={styles.formGroup}>
                  <label style={styles.label}>ドライバー氏名 {index + 1}</label>
                  <div style={styles.inputWrapper}>
                    <input
                      type="text"
                      value={driver.name}
                      onChange={(e) => {
                        const updated = [...formData.driversInfo]
                        updated[index].name = e.target.value
                        setFormData({ ...formData, driversInfo: updated })
                      }}
                      style={styles.input}
                      placeholder="運転免許番号"
                    />
                    <span style={styles.arrow}>›</span>
                  </div>
                </div>
              ))
            )}

            <button style={styles.addBtn} onClick={handleAddDriver}>
              追加 +
            </button>
          </div>
        </div>

        {/* 右パネル */}
        <div style={styles.rightPanel}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>事故</h3>

            <div style={styles.formGroup}>
              <label style={styles.label}>事故履歴有無</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} placeholder="Detail" />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>事故発生日</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} placeholder="Detail" />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>事故種別</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} placeholder="Detail" />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>事故詳細</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} placeholder="Detail" />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>違反履歴有無</label>
              <div style={styles.toggleWrapper}>
                <input type="checkbox" style={styles.toggle} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>違反発生日</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>違反種別</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>
          </div>
        </div>

        {/* VIN パネル */}
        <div style={styles.vinPanel}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>VIN</h3>

            <div style={styles.formGroup}>
              <input
                type="text"
                style={{ ...styles.input, marginBottom: '8px' }}
                placeholder="🔍 VIN"
                value={formData.vin}
                onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
              />
            </div>

            {formData.vinList.map((vin, index) => (
              <div key={index} style={styles.vinItem}>
                <div style={styles.vinName}>{vin}</div>
                <div style={styles.vinSubtitle}>Subtitle</div>
                <div style={styles.vinDetail}>Detail ›</div>
              </div>
            ))}
          </div>
        </div>

        {/* 車両情報パネル */}
        <div style={styles.vehiclePanel}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>車両情報（自動入力）</h3>

            <div style={styles.formGroup}>
              <label style={styles.label}>メーカー</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} placeholder="Detail" />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>モデル</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} placeholder="Detail" />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>年式</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} placeholder="Detail" />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>トリムレベル</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} placeholder="Detail" />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>ボディタイプ</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} placeholder="Detail" />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>所有形態</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} placeholder="Detail" />
              </div>
            </div>
          </div>
        </div>

        {/* 車両情報2 パネル */}
        <div style={styles.vehiclePanel}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>車両情報 2</h3>

            <div style={styles.formGroup}>
              <label style={styles.label}>年間走行距離</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>主な用途</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>通勤距離（片道）</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>業務利用有無</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>保管場所住所</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>保管場所タイプ</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>
          </div>
        </div>

        {/* 補償情報パネル */}
        <div style={styles.coveragePanel}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>補償情報</h3>

            <div style={styles.formGroup}>
              <label style={styles.label}>対人保険（オプション）</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>対物保険（オプション）</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>車両保険（オプション）</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>車両保険免責金額（オプション）</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>総合保険（オプション）</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>総合保険免責金額（オプション）</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>無保険車侵害（オプション）</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>総合保険免責金額（オプション）</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>医療費特約（オプション）</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>ロードサービス（オプション）</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>
          </div>
        </div>

        {/* 契約条件パネル */}
        <div style={styles.contractPanel}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>契約条件</h3>

            <div style={styles.formGroup}>
              <label style={styles.label}>変払條件</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>契約開始日</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>保有保険有無</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>保有保険会社</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>保有保険期間</label>
              <div style={styles.inputWrapper}>
                <input type="text" style={styles.input} />
              </div>
            </div>
          </div>
        </div>

        {/* 計算結果パネル */}
        <div style={styles.calculationPanel}>
          <div style={styles.section}>
            <h3 style={{ ...styles.sectionTitle, visibility: 'hidden' }}>Calc</h3>

            <div style={styles.calculationBox}>
              <button style={styles.calcButton} onClick={() => {
                setFormData({
                  ...formData,
                  calculationResult: {
                    premium: '計算結果',
                    status: '見積中'
                  }
                })
              }}>
                ▶ 計算
              </button>
            </div>

            <div style={styles.resultGroup}>
              <div style={styles.resultItem}>
                <span style={{ ...styles.resultLabel, color: '#0066cc' }}>計算結果</span>
              </div>
            </div>

            <div style={styles.detailGroup}>
              <div style={styles.detailItem}>
                <label>見積ID</label>
                <span style={styles.detailLink}>Detail</span>
              </div>
              <div style={styles.detailItem}>
                <label>計算日時</label>
                <span style={styles.detailLink}>Detail</span>
              </div>
              <div style={styles.detailItem}>
                <label>契約者名</label>
                <span style={styles.detailLink}>Detail</span>
              </div>
              <div style={styles.detailItem}>
                <label>車両情報マリ</label>
                <span style={styles.detailLink}>Detail</span>
              </div>
              <div style={styles.detailItem}>
                <label>保険料合計（月額）</label>
                <span style={styles.detailLink}>Detail</span>
              </div>
              <div style={styles.detailItem}>
                <label>保険料合計（年額）</label>
                <span style={styles.detailLink}>Detail</span>
              </div>
              <div style={styles.detailItem}>
                <label>内訳一覧テーブル</label>
                <span style={styles.detailLink}>Detail</span>
              </div>
              <div style={styles.detailItem}>
                <label>基準保障料</label>
                <span style={styles.detailLink}>Detail</span>
              </div>
              <div style={styles.detailItem}>
                <label>適用係数一覧</label>
                <span style={styles.detailLink}>Detail</span>
              </div>
            </div>
          </div>
        </div>
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
  )
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    fontFamily: "'Yu Gothic UI', 'Meiryo', sans-serif",
    overflowY: 'auto', // Ensure scrolling applies to the entire page
  },
  header: {
    flexShrink: 0,
    backgroundColor: '#fff',
    padding: '20px 24px',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTitle: {
    flex: 1,
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  meta: {
    fontSize: '12px',
    color: '#999',
  },
  headerActions: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  previewBtn: {
    padding: '8px 16px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  actionButtons: {
    display: 'flex',
    gap: '8px',
  },
  draftBtn: {
    padding: '8px 14px',
    backgroundColor: '#e8e8e8',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  saveBtn: {
    padding: '8px 14px',
    backgroundColor: '#ffc107',
    border: 'none',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#fff',
    cursor: 'pointer',
  },
  sendBtn: {
    padding: '8px 14px',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#fff',
    cursor: 'pointer',
  },
  closeBtn: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#fff',
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    padding: '24px',
    gap: '24px',
    justifyContent: 'center',
    alignContent: 'flex-start',
    maxWidth: '912px',
    margin: '0 auto',
  },
  leftPanel: {
    flex: '0 0 240px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '6px',
  },
  centerPanel: {
    flex: '0 0 240px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '6px',
  },
  rightPanel: {
    flex: '0 0 240px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '6px',
  },
  vinPanel: {
    flex: '0 0 240px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '6px',
  },
  vehiclePanel: {
    flex: '0 0 240px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '6px',
  },
  coveragePanel: {
    flex: '0 0 240px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '6px',
  },
  contractPanel: {
    flex: '0 0 240px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '6px',
  },
  calculationPanel: {
    flex: '0 0 240px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '6px',
  },
  vinItem: {
    marginBottom: '12px',
    paddingBottom: '8px',
    borderBottom: '1px solid #eee',
  },
  vinName: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#333',
  },
  vinSubtitle: {
    fontSize: '11px',
    color: '#999',
    marginTop: '2px',
  },
  vinDetail: {
    fontSize: '11px',
    color: '#0066cc',
    marginTop: '4px',
    cursor: 'pointer',
  },
  calculationBox: {
    padding: '12px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calculationStatus: {
    fontSize: '12px',
    color: '#999',
  },
  calcButton: {
    padding: '8px 16px',
    backgroundColor: '#0066ff',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  resultGroup: {
    display: 'flex',
    gap: '8px',
    marginBottom: '12px',
  },
  resultItem: {
    flex: 1,
    padding: '8px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    textAlign: 'center',
  },
  resultLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#333',
  },
  detailGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '12px',
    paddingBottom: '6px',
    borderBottom: '1px solid #eee',
  },
  section: {
    marginBottom: '20px',
  },
  sectionTitle: {
    margin: '0 0 12px 0',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
    borderBottom: '1px solid #eee',
    paddingBottom: '8px',
  },
  formGroup: {
    marginBottom: '12px',
  },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '4px',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  input: {
    flex: 1,
    padding: '6px 8px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    fontSize: '12px',
    outline: 'none',
  },
  detailLink: {
    fontSize: '11px',
    color: '#999',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  arrow: {
    fontSize: '16px',
    color: '#ccc',
    marginLeft: '4px',
  },
  emptyDriver: {
    marginBottom: '16px',
  },
  emptyDriverBox: {
    width: '100%',
    height: '80px',
    backgroundColor: '#f9f9f9',
    border: '2px dashed #ddd',
    borderRadius: '4px',
  },
  addBtn: {
    width: '100%',
    padding: '8px',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '3px',
    fontSize: '12px',
    color: '#0066cc',
    fontWeight: '600',
    cursor: 'pointer',
  },
  toggleWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  toggle: {
    width: '32px',
    height: '18px',
    cursor: 'pointer',
  },
}

export default Edit
