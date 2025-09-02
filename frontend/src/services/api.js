const API_BASE_URL = 'http://localhost:8000/api';

export const apiService = {
  async getTours() {
    const res = await fetch(`${API_BASE_URL}/tours/`);
    if (!res.ok) throw new Error('Failed to fetch tours');
    return res.json();
  },

  async getTourById(id) {
    const res = await fetch(`${API_BASE_URL}/tours/${id}`);
    if (!res.ok) throw new Error('Failed to fetch tour');
    return res.json();
  },

  async getTourDetails(slug) {
    const res = await fetch(`${API_BASE_URL}/tour-details/${slug}`);
    if (!res.ok) throw new Error('Failed to fetch tour details');
    return res.json();
  }
};
