export interface TableData {
  id: number;
  customerName: string;
  customerImage: string;
  serviceName: string;
  amount: string;
  editor: string;
  editorImage: string;
  date: string;
  time: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export const tableData: TableData[] = [
  {
    id: 1,
    customerName: 'Sasha',
    customerImage: '/assets/layout/Sasha.png',
    serviceName: 'Photo Editing',
    amount: 'N25,000',
    editor: 'Chris',
    editorImage: '/assets/layout/admin.png',
    date: '05/09/25',
    time: '07:22 AM',
    status: 'Completed'
  },
  {
    id: 2,
    customerName: 'Sasha',
    customerImage: '/assets/layout/Sasha.png',
    serviceName: 'Photo Editing',
    amount: 'N25,000',
    editor: 'Chris',
    editorImage: '/assets/layout/admin.png',
    date: '05/09/25',
    time: '07:22 AM',
    status: 'Pending'
  },
  {
    id: 3,
    customerName: 'John',
    customerImage: '/assets/layout/Sasha.png',
    serviceName: 'Photo Manipulation',
    amount: 'N35,000',
    editor: 'Alex',
    editorImage: '/assets/layout/admin.png',
    date: '06/09/25',
    time: '10:30 AM',
    status: 'Failed'
  },
  {
    id: 4,
    customerName: 'Maria',
    customerImage: '/assets/layout/Sasha.png',
    serviceName: 'Photo Editing',
    amount: 'N20,000',
    editor: 'Chris',
    editorImage: '/assets/layout/admin.png',
    date: '07/09/25',
    time: '02:15 PM',
    status: 'Completed'
  },
  {
    id: 5,
    customerName: 'David',
    customerImage: '/assets/layout/Sasha.png',
    serviceName: 'Photo Manipulation',
    amount: 'N45,000',
    editor: 'Sarah',
    editorImage: '/assets/layout/admin.png',
    date: '08/09/25',
    time: '11:45 AM',
    status: 'Pending'
  },
  {
    id: 6,
    customerName: 'Lisa',
    customerImage: '/assets/layout/Sasha.png',
    serviceName: 'Photo Editing',
    amount: 'N30,000',
    editor: 'Mike',
    editorImage: '/assets/layout/admin.png',
    date: '09/09/25',
    time: '09:20 AM',
    status: 'Completed'
  },
  {
    id: 7,
    customerName: 'Robert',
    customerImage: '/assets/layout/Sasha.png',
    serviceName: 'Photo Manipulation',
    amount: 'N50,000',
    editor: 'Emma',
    editorImage: '/assets/layout/admin.png',
    date: '10/09/25',
    time: '03:30 PM',
    status: 'Failed'
  },
  {
    id: 8,
    customerName: 'Anna',
    customerImage: '/assets/layout/Sasha.png',
    serviceName: 'Photo Editing',
    amount: 'N15,000',
    editor: 'Chris',
    editorImage: '/assets/layout/admin.png',
    date: '11/09/25',
    time: '08:00 AM',
    status: 'Pending'
  }
];
