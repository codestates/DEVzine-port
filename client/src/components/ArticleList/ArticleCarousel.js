import React from 'react';
import { Link } from 'react-router-dom';
import ArticleView from '../../pages/ArticleView';
import Carousel from 'react-multi-carousel';
import eye from '../../assets/images/eye.svg';

function ArticelCarousel({ ContributionData }) {
  return ContributionData ? (
    <>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1200,
            },
            items: 3,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 767,
              min: 0,
            },
            items: 1.5,
            partialVisibilityGutter: 40,
          },
          tablet: {
            breakpoint: {
              max: 199,
              min: 768,
            },
            items: 3,
            partialVisibilityGutter: 30,
          },
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {ContributionData.slice(0, 6).map(el => {
          return (
            <Link
              to={`/article/con-${el.contribution_id}`}
              children={<ArticleView />}
              key={el.contribution_id}
            >
              <div className="contributionbox">
                <ul>
                  <li className="articlebox-date ">
                    {el.article_date.split('T')[0].replace(/-/gi, '.')}
                  </li>
                  <li className="articlebox-title ell-24 sm-hidden">
                    {el.article_title}
                  </li>
                  <li className="articlebox-title ell-18-2 sm-only">
                    {el.article_title}
                  </li>
                  <li className="articlebox-content-con ell-12 ">
                    {el.article_content}
                  </li>
                  <li>
                    <span className="articlebox-keyword-con">
                      {el.article_keyword}
                    </span>
                    <span className="articlebox-hit-con">
                      <img src={eye} alt="view number" />
                      <span>{el.hit}</span>
                    </span>
                  </li>
                </ul>
              </div>
            </Link>
          );
        })}
      </Carousel>
    </>
  ) : null;
}

export default ArticelCarousel;
