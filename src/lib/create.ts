import { AtpAgent, AtpAgentCreateAccountOpts, ComAtprotoServerCreateAccount } from "@atproto/api";
import axios from 'axios';

// Define the input parameters based on your API schema
interface AccountCreationParams {
  handle: string; // required
  email: string;
  password: string;
  //inviteCode?: string;
  // Include other optional parameters from your schema if needed
}


// Initialize your AtpAgent with the appropriate configuration
const SES_LOCAL_STORAGE_KEY = "sess";
const agentDID = new AtpAgent({
  service: "https://didconnect.tech",
  persistSession: (evt, sess) => {
    localStorage.setItem(SES_LOCAL_STORAGE_KEY, JSON.stringify(sess));
  },
});

async function generateInviteCode() {
  try {
    const response = await axios.get('https://didconnect.tech/xrpc/com.atproto.server.createInviteCode'); //com.atproto.server.createInviteCode or generateInviteCode
    if (response.data && response.data.code) {
      return response.data.code; // Assuming the API returns an object with a 'code' property
    } else {
      throw new Error('Failed to generate invite code');
    }
  } catch (error) {
    console.error('Error generating invite code:', error);
    throw error;
  }
}

// Function to create a new account using the AtpAgent
export const createAccount = async (params: AccountCreationParams): Promise<ComAtprotoServerCreateAccount.Response> => {
  try {
    const inviteCode = await generateInviteCode();
    // Prepare the options for the API call according to the required AtpAgentCreateAccountOpts interface
    const opts: AtpAgentCreateAccountOpts = {
      email: params.email,
      handle: params.handle,
      password: params.password,
      inviteCode: inviteCode,
      // Add other properties if required by the API
    };

    // Execute the API call
    const response: ComAtprotoServerCreateAccount.Response = await agentDID.createAccount(opts);

    // If the call returns without throwing, assume it was successful
    console.log('Account created successfully:', response);
    return response; // Use the correct response type from ComAtprotoServerCreateAccount

  } catch (error) {
    console.error('Error creating account:', error);
    throw error; // Rethrow or handle the error as appropriate for your application
  }
};