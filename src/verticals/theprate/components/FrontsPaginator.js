import React from 'react';

export function FrontsPaginator({ hasMore, loadMore }) {
    return (
      <div className="FrontsPaginator">
        {hasMore ? <button className="FrontsPaginator__button" onClick={loadMore}>Load more</button> : <span className="FrontsPaginator__end">fin.</span>}
      </div>
    );

}
