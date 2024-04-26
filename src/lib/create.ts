
import { AtpAgent, AtpAgentCreateAccountOpts, ComAtprotoServerCreateAccount } from "@atproto/api";
import axios from 'axios';

interface AccountCreationParams {
  handle: string;
  email: string;
  password: string;
}

const agentDID = new AtpAgent({
  service: "https://didconnect.tech",
  persistSession: (evt, sess) => {
    localStorage.setItem("sess", JSON.stringify(sess));
  },
});

async function generateInviteCode() {
  const response = await axios.post('https://didconnect.tech/xrpc/com.atproto.server.createInviteCode');
  return response.data.code;
}

export const createAccount = async (params: AccountCreationParams): Promise<ComAtprotoServerCreateAccount.Response> => {
  try {
    const inviteCode = await generateInviteCode();
    const opts: AtpAgentCreateAccountOpts = {
      email: params.email,
      handle: params.handle,
      password: params.password,
      inviteCode,
    };

    const response = await agentDID.createAccount(opts);
    return response;
  } catch (error) {
    console.error('API response:', error.response?.data); // Log detailed error message from API
    throw new Error(`Failed to create account. Server responded with: ${error.response?.status} ${error.response?.data?.message}`);
  }
};
