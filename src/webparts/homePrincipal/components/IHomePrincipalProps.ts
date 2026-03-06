import { WebPartContext } from '@microsoft/sp-webpart-base'; 

export interface IHomePrincipalProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
}