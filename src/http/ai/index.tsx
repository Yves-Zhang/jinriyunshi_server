import { post, get } from '../request';

const baseUrl = process.env.HTTP_AI_URL;
const token = process.env.HTTP_AI_TOKEN;
const appId = process.env.HTTP_AI_APPID;

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

// https://qianfan.baidubce.com/v2/app/conversation
export const getConversation = () =>
  post({
    url: `${baseUrl}/v2/app/conversation`,
    headers,
    data: {
      app_id: appId,
    },
  });


  // curl --location 'https://qianfan.baidubce.com/v2/app/conversation/runs' \
  // --header 'Authorization: Bearer authorization string' \
  // --header 'Content-Type: application/json' \
  // --data '{
  //     "app_id": "85036d8f-239c-469c-b342-b62ca9d696f6",
  //     "query": "根据文件中的数据，统计这几所学校小学生有多少",
  //     "stream": true,
  //     "conversation_id": "355a4f4e-a6d8-4dec-b840-7075030c6d22",
  //     "file_ids": [
  //         "cdd1e194-cfb7-4173-a154-795fae8535d9"
  //     ]
  // }'

export const getConversationRuns = (conversationId: string, query: string, fileIds?: string[]) =>
  post({
    url: `${baseUrl}/v2/app/conversation/runs`,
    headers,
    data: {
      app_id: appId,
      query,
      stream: true,
      conversation_id: conversationId,
      file_ids: fileIds,
    },
  });

  // 对话方法
  export const conversation = async (query: string, conversation_id?: string) => {
    let conversationId = conversation_id;
    if (!conversationId) {
      const ret = await getConversation();
      conversationId = ret.data.conversation_id;
    }

    const retRuns = await getConversationRuns(conversationId, query);
    return retRuns
  }