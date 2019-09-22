import { createContext, useState } from 'react';

const AppContext = createContext(null as any);

export default AppContext;
export const Provider = AppContext.Provider;
export const Consumer = AppContext.Consumer;