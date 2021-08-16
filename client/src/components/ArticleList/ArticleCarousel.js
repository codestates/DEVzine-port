import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { customAxios } from '../../utils/customAxios';

function ArticelCarousel() {
  const [ContributionDate, setContributionDate] = useState(null);

  useEffect(async () => {
    await customAxios
      .get('/magazine')
      .then(res => setContributionDate(res.data.contributionData))
      .catch(err => {
        let FakeDate = [
          {
            contribution_id: 1,
            contribution_title: 'contribution_title1',
            contribution_content: 'contribution_content',
            contribution_keyword: '게임',
            contribution_date: '2021.08.16',
            hit: '1004',
          },
          {
            contribution_id: 2,
            contribution_title: 'contribution_title2',
            contribution_content: 'contribution_content',
            contribution_keyword: '게임',
            contribution_date: '2021.08.16',
            hit: '1004',
          },
          {
            contribution_id: 3,
            contribution_title: 'contribution_title3',
            contribution_content: 'contribution_content',
            contribution_keyword: '게임',
            contribution_date: '2021.08.16',
            hit: '1004',
          },
          {
            contribution_id: 4,
            contribution_title: 'contribution_title4',
            contribution_content: 'contribution_content',
            contribution_keyword: '게임',
            contribution_date: '2021.08.16',
            hit: '1004',
          },
          {
            contribution_id: 5,
            contribution_title: 'contribution_title4',
            contribution_content: 'contribution_content',
            contribution_keyword: '게임',
            contribution_date: '2021.08.16',
            hit: '1004',
          },
          {
            contribution_id: 6,
            contribution_title: 'contribution_title4',
            contribution_content: 'contribution_content',
            contribution_keyword: '게임',
            contribution_date: '2021.08.16',
            hit: '1004',
          },
          {
            contribution_id: 7,
            contribution_title: 'contribution_title4',
            contribution_content: 'contribution_content',
            contribution_keyword: '게임',
            contribution_date: '2021.08.16',
            hit: '1004',
          },
        ];

        setContributionDate(FakeDate);

        return alert('기고글 받아오는데 실패하였습니다.');
      });
  }, []);

  return ContributionDate ? (
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
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 199,
              min: 768,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {ContributionDate.slice(0, 5).map(el => {
          return (
            <div key={el.contribution_id} className="contributionBox">
              <ul>
                <li>{el.contribution_date}</li>
                <li>{el.contribution_title}</li>
                <li>{el.contribution_content}</li>
                <li>{el.contribution_keyword}</li>
                <li>{el.hit}</li>
              </ul>
            </div>
          );
        })}
      </Carousel>
    </>
  ) : null;
}

export default ArticelCarousel;
