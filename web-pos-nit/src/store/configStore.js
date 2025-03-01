import { create } from "zustand"; // global state

export const configStore = create((set) => ({
  config: {
    category: null,
    role: null,
    supplier: null,
    purchase_status: null,
    brand: null,
    customer: null,
    expense_type: null,
    expense : null,
    unit:null,
    company_name:null,
    user:null,
    branch_name:null
  },
  setConfig: (params) =>
    set((state) => ({
      config: params,
    })),
  //   descrease: () =>
  //     set((state) => ({
  //       count: state.count - 1,
  //     })),
}));
