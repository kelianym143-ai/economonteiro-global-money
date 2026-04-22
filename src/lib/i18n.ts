export type Lang = "pt" | "en" | "es" | "fr" | "de" | "it" | "ja";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
];

type Dict = {
  appName: string;
  tagline: string;
  dashboard: string;
  transactions: string;
  analytics: string;
  goals: string;
  settings: string;
  balance: string;
  income: string;
  expenses: string;
  savings: string;
  thisMonth: string;
  recentTransactions: string;
  spendingByCategory: string;
  monthlyTrend: string;
  addTransaction: string;
  description: string;
  amount: string;
  category: string;
  date: string;
  type: string;
  cancel: string;
  save: string;
  language: string;
  theme: string;
  light: string;
  dark: string;
  hero: string;
  heroSub: string;
  getStarted: string;
  viewAll: string;
  noTransactions: string;
  food: string;
  transport: string;
  shopping: string;
  bills: string;
  entertainment: string;
  salary: string;
  other: string;
  vsLastMonth: string;
  cards: string;
  myCards: string;
  addCard: string;
  cardNickname: string;
  cardHolder: string;
  cardNumber: string;
  creditLimit: string;
  closingDay: string;
  dueDay: string;
  available: string;
  used: string;
  invalidCard: string;
  noCards: string;
  cardsDescription: string;
  privacyMode: string;
  privacyModeDesc: string;
  securityNote: string;
  linkedCard: string;
  none: string;
  delete: string;
  confirmDelete: string;
};

const dicts: Record<Lang, Dict> = {
  pt: {
    appName: "EconoMonteiro",
    tagline: "Seu assistente financeiro inteligente",
    dashboard: "Painel",
    transactions: "Transações",
    analytics: "Análises",
    goals: "Metas",
    settings: "Configurações",
    balance: "Saldo total",
    income: "Receitas",
    expenses: "Despesas",
    savings: "Economia",
    thisMonth: "Este mês",
    recentTransactions: "Transações recentes",
    spendingByCategory: "Gastos por categoria",
    monthlyTrend: "Tendência mensal",
    addTransaction: "Nova transação",
    description: "Descrição",
    amount: "Valor",
    category: "Categoria",
    date: "Data",
    type: "Tipo",
    cancel: "Cancelar",
    save: "Salvar",
    language: "Idioma",
    theme: "Tema",
    light: "Claro",
    dark: "Escuro",
    hero: "Domine suas finanças com inteligência",
    heroSub: "Acompanhe gastos, defina metas e tome decisões mais inteligentes com gráficos em tempo real.",
    getStarted: "Começar agora",
    viewAll: "Ver tudo",
    noTransactions: "Nenhuma transação ainda",
    food: "Alimentação",
    transport: "Transporte",
    shopping: "Compras",
    bills: "Contas",
    entertainment: "Lazer",
    salary: "Salário",
    other: "Outros",
    vsLastMonth: "vs mês anterior",
  },
  en: {
    appName: "EconoMonteiro",
    tagline: "Your smart financial assistant",
    dashboard: "Dashboard",
    transactions: "Transactions",
    analytics: "Analytics",
    goals: "Goals",
    settings: "Settings",
    balance: "Total balance",
    income: "Income",
    expenses: "Expenses",
    savings: "Savings",
    thisMonth: "This month",
    recentTransactions: "Recent transactions",
    spendingByCategory: "Spending by category",
    monthlyTrend: "Monthly trend",
    addTransaction: "New transaction",
    description: "Description",
    amount: "Amount",
    category: "Category",
    date: "Date",
    type: "Type",
    cancel: "Cancel",
    save: "Save",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    hero: "Master your finances with intelligence",
    heroSub: "Track spending, set goals and make smarter decisions with real-time charts.",
    getStarted: "Get started",
    viewAll: "View all",
    noTransactions: "No transactions yet",
    food: "Food",
    transport: "Transport",
    shopping: "Shopping",
    bills: "Bills",
    entertainment: "Entertainment",
    salary: "Salary",
    other: "Other",
    vsLastMonth: "vs last month",
  },
  es: {
    appName: "EconoMonteiro",
    tagline: "Tu asistente financiero inteligente",
    dashboard: "Panel",
    transactions: "Transacciones",
    analytics: "Análisis",
    goals: "Metas",
    settings: "Ajustes",
    balance: "Saldo total",
    income: "Ingresos",
    expenses: "Gastos",
    savings: "Ahorros",
    thisMonth: "Este mes",
    recentTransactions: "Transacciones recientes",
    spendingByCategory: "Gastos por categoría",
    monthlyTrend: "Tendencia mensual",
    addTransaction: "Nueva transacción",
    description: "Descripción",
    amount: "Monto",
    category: "Categoría",
    date: "Fecha",
    type: "Tipo",
    cancel: "Cancelar",
    save: "Guardar",
    language: "Idioma",
    theme: "Tema",
    light: "Claro",
    dark: "Oscuro",
    hero: "Domina tus finanzas con inteligencia",
    heroSub: "Controla gastos, define metas y toma mejores decisiones con gráficos en tiempo real.",
    getStarted: "Comenzar",
    viewAll: "Ver todo",
    noTransactions: "Sin transacciones aún",
    food: "Comida",
    transport: "Transporte",
    shopping: "Compras",
    bills: "Facturas",
    entertainment: "Ocio",
    salary: "Salario",
    other: "Otros",
    vsLastMonth: "vs mes anterior",
  },
  fr: {
    appName: "EconoMonteiro",
    tagline: "Votre assistant financier intelligent",
    dashboard: "Tableau de bord",
    transactions: "Transactions",
    analytics: "Analyses",
    goals: "Objectifs",
    settings: "Paramètres",
    balance: "Solde total",
    income: "Revenus",
    expenses: "Dépenses",
    savings: "Épargne",
    thisMonth: "Ce mois-ci",
    recentTransactions: "Transactions récentes",
    spendingByCategory: "Dépenses par catégorie",
    monthlyTrend: "Tendance mensuelle",
    addTransaction: "Nouvelle transaction",
    description: "Description",
    amount: "Montant",
    category: "Catégorie",
    date: "Date",
    type: "Type",
    cancel: "Annuler",
    save: "Enregistrer",
    language: "Langue",
    theme: "Thème",
    light: "Clair",
    dark: "Sombre",
    hero: "Maîtrisez vos finances avec intelligence",
    heroSub: "Suivez vos dépenses, fixez des objectifs et prenez de meilleures décisions avec des graphiques en temps réel.",
    getStarted: "Commencer",
    viewAll: "Tout voir",
    noTransactions: "Aucune transaction",
    food: "Nourriture",
    transport: "Transport",
    shopping: "Achats",
    bills: "Factures",
    entertainment: "Loisirs",
    salary: "Salaire",
    other: "Autres",
    vsLastMonth: "vs mois dernier",
  },
  de: {
    appName: "EconoMonteiro",
    tagline: "Ihr intelligenter Finanzassistent",
    dashboard: "Übersicht",
    transactions: "Transaktionen",
    analytics: "Analysen",
    goals: "Ziele",
    settings: "Einstellungen",
    balance: "Gesamtsaldo",
    income: "Einnahmen",
    expenses: "Ausgaben",
    savings: "Ersparnisse",
    thisMonth: "Diesen Monat",
    recentTransactions: "Letzte Transaktionen",
    spendingByCategory: "Ausgaben nach Kategorie",
    monthlyTrend: "Monatlicher Trend",
    addTransaction: "Neue Transaktion",
    description: "Beschreibung",
    amount: "Betrag",
    category: "Kategorie",
    date: "Datum",
    type: "Typ",
    cancel: "Abbrechen",
    save: "Speichern",
    language: "Sprache",
    theme: "Design",
    light: "Hell",
    dark: "Dunkel",
    hero: "Meistern Sie Ihre Finanzen mit Intelligenz",
    heroSub: "Verfolgen Sie Ausgaben, setzen Sie Ziele und treffen Sie smartere Entscheidungen mit Echtzeit-Diagrammen.",
    getStarted: "Loslegen",
    viewAll: "Alle anzeigen",
    noTransactions: "Noch keine Transaktionen",
    food: "Essen",
    transport: "Transport",
    shopping: "Einkaufen",
    bills: "Rechnungen",
    entertainment: "Unterhaltung",
    salary: "Gehalt",
    other: "Sonstiges",
    vsLastMonth: "vs Vormonat",
  },
  it: {
    appName: "EconoMonteiro",
    tagline: "Il tuo assistente finanziario intelligente",
    dashboard: "Pannello",
    transactions: "Transazioni",
    analytics: "Analisi",
    goals: "Obiettivi",
    settings: "Impostazioni",
    balance: "Saldo totale",
    income: "Entrate",
    expenses: "Spese",
    savings: "Risparmi",
    thisMonth: "Questo mese",
    recentTransactions: "Transazioni recenti",
    spendingByCategory: "Spese per categoria",
    monthlyTrend: "Tendenza mensile",
    addTransaction: "Nuova transazione",
    description: "Descrizione",
    amount: "Importo",
    category: "Categoria",
    date: "Data",
    type: "Tipo",
    cancel: "Annulla",
    save: "Salva",
    language: "Lingua",
    theme: "Tema",
    light: "Chiaro",
    dark: "Scuro",
    hero: "Domina le tue finanze con intelligenza",
    heroSub: "Monitora le spese, fissa obiettivi e prendi decisioni migliori con grafici in tempo reale.",
    getStarted: "Inizia ora",
    viewAll: "Vedi tutto",
    noTransactions: "Nessuna transazione",
    food: "Cibo",
    transport: "Trasporti",
    shopping: "Acquisti",
    bills: "Bollette",
    entertainment: "Svago",
    salary: "Stipendio",
    other: "Altro",
    vsLastMonth: "vs mese scorso",
  },
  ja: {
    appName: "EconoMonteiro",
    tagline: "あなたのスマート財務アシスタント",
    dashboard: "ダッシュボード",
    transactions: "取引",
    analytics: "分析",
    goals: "目標",
    settings: "設定",
    balance: "総残高",
    income: "収入",
    expenses: "支出",
    savings: "貯蓄",
    thisMonth: "今月",
    recentTransactions: "最近の取引",
    spendingByCategory: "カテゴリー別支出",
    monthlyTrend: "月次トレンド",
    addTransaction: "新規取引",
    description: "説明",
    amount: "金額",
    category: "カテゴリー",
    date: "日付",
    type: "種類",
    cancel: "キャンセル",
    save: "保存",
    language: "言語",
    theme: "テーマ",
    light: "ライト",
    dark: "ダーク",
    hero: "知性で財務をマスター",
    heroSub: "支出を追跡し、目標を設定し、リアルタイムグラフでより賢い決定を。",
    getStarted: "始める",
    viewAll: "すべて表示",
    noTransactions: "取引はまだありません",
    food: "食費",
    transport: "交通",
    shopping: "買い物",
    bills: "請求",
    entertainment: "娯楽",
    salary: "給料",
    other: "その他",
    vsLastMonth: "前月比",
  },
};

export const getDict = (lang: Lang): Dict => dicts[lang];
