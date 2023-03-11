export type DOMMessage = {
  type: 'GET_DOM' | 'SHOW_LOGIN_DIV'
}

export type DOMMessageResponse = {
  title: string;
  headlines: string[];
}
