import { Slash } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { useLocation } from 'react-router-dom';
import React from 'react';

const PageHeader = ({ title }: { title: string }) => {
  const { pathname } = useLocation();
  const paths = pathname?.split('/').filter((path) => path !== '');
  return (
    <div className="bg-athens-gray-50">
      <div className="container space-y-3">
        <h3 className="text-3xl font-bold text-h-black">{title}</h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
              <React.Fragment>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${paths?.[0]}`}>
                    {paths?.[0]?.slice(0, 1).toUpperCase() + paths?.[0].slice(1)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default PageHeader;
