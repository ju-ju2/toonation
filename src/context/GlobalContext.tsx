import React, { createContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  type MessageInstance,
  type MessageProps,
  useMessage,
} from '@/components/ui/message/message.hook';

interface GlobalContextContainerProps {}

interface GlobalConfig {
  message: (props: MessageProps) => void;
  messageApi: MessageInstance;
}

export const GlobalContext = createContext<GlobalConfig | undefined>(undefined);

const GlobalContextContainer = ({
  children,
}: React.PropsWithChildren<GlobalContextContainerProps>): React.ReactElement => {
  const [messageApi, contextHolder] = useMessage();

  const message = ({
    type = 'success',
    title,
    description,
    key,
  }: MessageProps) => {
    messageApi[type]({
      title,
      description,
      key,
    });
  };

  const value = { message, messageApi };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        throwOnError: true,
      },
      mutations: {
        throwOnError: false,
        onError: (error) => {
          console.error(error);
        },
      },
    },
  });

  return (
    <GlobalContext.Provider value={value}>
      {contextHolder}
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = React.useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      'GlobalContext must be used within a GlobalContextProvider'
    );
  }
  return context;
};

export default GlobalContextContainer;
