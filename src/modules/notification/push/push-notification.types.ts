export type NotifyOptions = {
  title: string;
  message: string;
  actionLink?: string;
  priority: 'max' | 'high' | 'default' | 'low' | 'min';
  tags: string[];
};
