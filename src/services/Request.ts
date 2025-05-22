import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function post_request(url: string, body: any) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (e) {
    throw e;
  }
}



export async function get_request(url: string) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (e) {
    throw e;
  }
}
