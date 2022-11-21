import React from 'react';
import s from './pagination.module.css';


const Pagination = ({ postsPerPage, totalPosts, setCurrentPage }) => {
    const page=[];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        page.push(i); 
    }

    function paginate(number) {
    setCurrentPage(number);
    }

return (
<React.Fragment>
<nav className={s.nav}>
    <div>
    {page && page.map((num) => (
        <button key={num} onClick={() => paginate(num)} >{num}</button>
    ))}
    </div>
</nav>
</React.Fragment>
);
}

export default Pagination
