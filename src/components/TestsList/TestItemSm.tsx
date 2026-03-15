import type {ITestBase} from '@/api/endpoints/testsEndpoints/schema/TestsEndpointsSchema';
import {type FC} from 'react';
import {cn} from '@/helpers/utils/cn';
import {Link, useNavigate} from 'react-router';
import {Button} from '@/components/common';
import type {IUser} from '@/api/endpoints/authEndpoints/schema/AuthEndpointsSchema';

interface TestItemSmProps {
  className?: string;
  test: ITestBase;
  me?: IUser | undefined;
  onDelete: (testId: string) => void;
}

export const TestItemSm: FC<TestItemSmProps> = ({test, className, me, onDelete}) => {
  const {_id: id, createdAt, name} = test;
  const navigate = useNavigate();

  return (
    <li>
      <Link
        className={cn(
          'group relative flex flex-col gap-2 p-5 rounded-xl border border-border bg-surface transition-all duration-200',
          'hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 hover:-translate-y-1 cursor-pointer',
          className,
        )}
        to={`/tests/${id}`}
      >
        <h2 className="text-lg font-bold text-text-main group-hover:text-primary transition-colors leading-tight">
          {name}
        </h2>
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <p className="text-xs font-medium text-text-muted flex items-center gap-1.5">
            <span className="opacity-70">Создан:</span>
            {new Date(createdAt).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          {me && me.role === 'admin' ? (
            <div className="flex items-center gap-2.5">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/tests/${id}/edit`);
                }}
              >
                Редактировать
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  onDelete(id);
                }}
              >
                Удалить
              </Button>
            </div>
          ) : null}
        </div>
      </Link>
    </li>
  );
};
