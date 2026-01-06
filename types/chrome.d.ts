declare namespace chrome {
  namespace storage {
    interface StorageArea {
      get(keys: string | string[] | { [key: string]: any } | null, callback: (items: { [key: string]: any }) => void): void;
      set(items: { [key: string]: any }, callback?: () => void): void;
    }
    const local: StorageArea;
    const onChanged: {
      addListener(callback: (changes: { [key: string]: { oldValue?: any; newValue?: any } }, areaName: string) => void): void;
    };
  }

  namespace runtime {
    function getURL(path: string): string;
    const onMessage: {
      addListener(callback: (message: any, sender: any, sendResponse: (response?: any) => void) => void): void;
    };
    const onInstalled: {
      addListener(callback: () => void): void;
    };
  }

  namespace contextMenus {
    interface CreateProperties {
      id?: string;
      title: string;
      contexts?: string[];
    }
    function create(createProperties: CreateProperties): void;
    interface OnClickData {
      menuItemId: string | number;
      selectionText?: string;
    }
    const onClicked: {
      addListener(callback: (info: OnClickData, tab?: tabs.Tab) => void): void;
    };
  }

  namespace tabs {
    interface Tab {
      id?: number;
    }
    function sendMessage(tabId: number, message: any): void;
  }
}
