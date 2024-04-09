import axios from 'axios';

interface AllowanceResponse {
  allowance: string;
}

async function getAllowance(chainId: string, walletAddress: string): Promise<AllowanceResponse> {
    const baseUrl = 'https://api.1inch.dev/swap/v6.0/';
  
    const headers = {
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY_1INCH}`,
      Accept: 'application/json',
    };
  
    try {
      const response = await axios.get<AllowanceResponse>(`${baseUrl}${chainId}/1/approve/allowance`, {
        params: {
          tokenAddress: '0x111111111117dC0aa78b770fA6A738034120C302',
          walletAddress,
        },
        headers,
      });
  
      return response.data;
    } catch (error) {
      console.error('Error fetching allowance:', error);
      throw error; 
    }
  }
