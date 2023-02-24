import axios from 'axios';

class NotesApi {
  endpoint = 'https://us-central1-take-home-6fb23.cloudfunctions.net/api';

  username = 'rizwan';

  baseUrl = `${this.endpoint}/${this.username}`;

  async listNotes() {
    try {
      const response = await axios({
        method: 'get',
        baseURL: this.baseUrl,
        url: 'notes',
      });

      // Parse the data from the response
      const { data } = response.data;

      return {
        success: true,
        data,
      };
    } catch (error) {
      // Grab the error message from the server
      const {
        data: { message },
      } = error.response;

      return {
        success: false,
        message: message ?? error.message,
      };
    }
  }

  async storeNote(body) {
    try {
      const response = await axios({
        method: 'post',
        baseURL: this.baseUrl,
        url: 'notes',
        data: { ...body },
      });

      const { data } = response.data;

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async updateNote(body, id) {
    try {
      const response = await axios({
        method: 'patch',
        baseURL: this.baseUrl,
        url: `notes/${id}`,
        data: { ...body },
      });

      const { data } = response.data;
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async deleteNote(id) {
    try {
      const response = await axios({
        method: 'delete',
        baseURL: this.baseUrl,
        url: `notes/${id}`,
      });

      const { data } = response.data;

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

export default NotesApi;
