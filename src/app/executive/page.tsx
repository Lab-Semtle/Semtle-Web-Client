import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CreditCard, CreditCardIcon, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function ExecutiveDashboardPage() {
  const stats = [
    {
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      title: '총 학회원 수',
      value: '200',
    },
    {
      icon: <CreditCardIcon className="h-4 w-4 text-muted-foreground" />,
      title: '학회비 잔고',
      value: '₩2,000,000',
    },
    {
      icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
      title: '일 평균 방문횟수',
      value: '532',
    },
    {
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
      title: '오늘 방문횟수',
      value: '223',
    },
  ];

  const recentSales = [
    {
      name: '차은우',
      email: 'martin@g.kmou.ac.kr',
      amount: '20XX13XX',
    },
    {
      name: '최지현',
      email: 'jacksonlee@g.kmou.ac.kr',
      amount: '20XX13XX',
    },
    {
      name: '박현수',
      email: 'nguyen@g.kmou.ac.kr',
      amount: '20XX13XX',
    },
    { name: '엄찬', email: 'william@g.kmou.ac.kr', amount: '20XX13XX' },
    { name: '김민정', email: 'sofia@g.kmou.ac.kr', amount: '20XX13XX' },
  ];

  return (
    <div className="relative p-4">
      {/* 준비중 메시지 */}
      <h1 className="mb-6 text-center text-4xl font-bold text-gray-700">
        준비중 입니다..!
      </h1>

      {/* 대시보드 콘텐츠 컨테이너 */}
      <div className="relative">
        {/* 대시보드 콘텐츠 (흐리게 표시) */}
        <div className="pointer-events-none opacity-50">
          {/* Stats Grid */}
          <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dashboard Content */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Recent Sales */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>최근 접속 기록</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>이름</TableHead>
                      <TableHead>이메일</TableHead>
                      <TableHead className="text-right">학번</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentSales.map((sale, index) => (
                      <TableRow key={index}>
                        <TableCell>{sale.name}</TableCell>
                        <TableCell>{sale.email}</TableCell>
                        <TableCell className="text-right">
                          {sale.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>메뉴 바로가기</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">
                  기타 메뉴...
                </Button>
                <Button variant="outline" className="w-full">
                  학회원 관리 바로가기
                </Button>
                <Button variant="outline" className="w-full">
                  개발 이슈 확인하기
                </Button>
                <Button variant="outline" className="w-full">
                  기능 추가/오류 문의하기 (개발팀)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 클릭 방지 오버레이 */}
        <div className="pointer-events-auto absolute inset-0 bg-gray-500 bg-opacity-50"></div>
      </div>
    </div>
  );
}
