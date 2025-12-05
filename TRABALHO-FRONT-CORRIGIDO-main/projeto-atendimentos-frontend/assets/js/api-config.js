// Configuração da API para o front-end
// Este arquivo centraliza todas as URLs e configurações da API

// Use explicit backend origin when front served from a different dev server
// (e.g. Live Server at :5500). Isso garante que as chamadas apontem sempre
// para o backend Node em desenvolvimento.
const API_BASE_URL = (function(){
  try {
    const origin = window.location.origin || '';
    // If the front is not served from the backend origin, force backend URL
    if (!origin.includes(':3000')) {
      return 'http://localhost:3000/api';
    }
    return origin + '/api';
  } catch(e) {
    return 'http://localhost:3000/api';
  }
})();

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  
  // Endpoints de autenticação
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    VERIFY: `${API_BASE_URL}/auth/verify`
  },
  
  // Endpoints de usuários
  USERS: {
    LIST: `${API_BASE_URL}/users`,
    GET: (id) => `${API_BASE_URL}/users/${id}`,
    CREATE: `${API_BASE_URL}/users`,
    UPDATE: (id) => `${API_BASE_URL}/users/${id}`,
    DELETE: (id) => `${API_BASE_URL}/users/${id}`
  },
  
  // Endpoints de perfil
  PROFILE: {
    GET: `${API_BASE_URL}/profile`,
    UPDATE: `${API_BASE_URL}/profile`
  },
  
  // Endpoints de atendimento
  ATTENDANCE: {
    LIST: `${API_BASE_URL}/attendance`,
    GET: (id) => `${API_BASE_URL}/attendance/${id}`,
    CREATE: `${API_BASE_URL}/attendance`,
    UPDATE: (id) => `${API_BASE_URL}/attendance/${id}`,
    DELETE: (id) => `${API_BASE_URL}/attendance/${id}`
  },
  
  // Endpoints de formulários de atendimento
  ATTENDANCE_FORMS: {
    LIST: `${API_BASE_URL}/attendance-forms`,
    GET: (id) => `${API_BASE_URL}/attendance-forms/${id}`,
    CREATE: `${API_BASE_URL}/attendance-forms`,
    UPDATE: (id) => `${API_BASE_URL}/attendance-forms/${id}`,
    DELETE: (id) => `${API_BASE_URL}/attendance-forms/${id}`
  },
  
  // Endpoints de tipos de atendimento
  ATTENDANCE_TYPES: {
    LIST: `${API_BASE_URL}/attendance-types`,
    GET: (id) => `${API_BASE_URL}/attendance-types/${id}`,
    CREATE: `${API_BASE_URL}/attendance-types`,
    UPDATE: (id) => `${API_BASE_URL}/attendance-types/${id}`,
    DELETE: (id) => `${API_BASE_URL}/attendance-types/${id}`
  },
  
  // Endpoints de campos de tipos de atendimento
  ATTENDANCE_TYPE_FIELDS: {
    LIST: `${API_BASE_URL}/attendance-type-fields`,
    GET: (id) => `${API_BASE_URL}/attendance-type-fields/${id}`,
    CREATE: `${API_BASE_URL}/attendance-type-fields`,
    UPDATE: (id) => `${API_BASE_URL}/attendance-type-fields/${id}`,
    DELETE: (id) => `${API_BASE_URL}/attendance-type-fields/${id}`
  },
  
  // Endpoints de tipos públicos
  PUBLIC_TYPES: {
    LIST: `${API_BASE_URL}/public-types`,
    GET: (id) => `${API_BASE_URL}/public-types/${id}`,
    CREATE: `${API_BASE_URL}/public-types`,
    UPDATE: (id) => `${API_BASE_URL}/public-types/${id}`,
    DELETE: (id) => `${API_BASE_URL}/public-types/${id}`
  },
  
  // Endpoints de relatórios
  REPORTS: {
    LIST: `${API_BASE_URL}/reports`,
    GENERATE: `${API_BASE_URL}/reports/generate`,
    EXPORT: `${API_BASE_URL}/reports/export`
  },
  
  // Endpoint de status
  STATUS: `${API_BASE_URL}/status`
};

// Função auxiliar para fazer requisições
export async function apiRequest(url, options = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
  };
  
  const finalOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    }
  };
  
  try {
    const response = await fetch(url, finalOptions);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}
