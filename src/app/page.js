"use client"
import { useEffect, useRef, useState } from 'react';
import { 
  List, 
  AutoSizer, 
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
} from 'react-virtualized';

export default function Home() {
  const [people, setPeople] = useState([]);
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(new Date());

  const cache = useRef( new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100,
  }));

  useEffect(()=> {
    setPeople([...Array(15).keys()].map(key => ({
      id: key,
      name: `Kian Ebert ${key}`,
      bio: 'Exercitationem molestiae autem dignissimos ratione sunt ut temporibus. Modi iusto quos molestias. Aut ab fugit id ullam amet commodi iusto est. Itaque qui minus. Animi velit iure est at corrupti expedita deserunt. Reprehenderit non ab nihil aut aut est sint quas sunt. Doloremque ullam quod ut aut ut qui. Sapiente quod non. In praesentium quas porro aliquam eius. Aut voluptatum ea. Eum sit illo maiores libero consequuntur. Qui eius suscipit est voluptatibus consequatur omnis. Doloribus et maxime. Nisi sint quia velit rerum beatae et eum. Et dolores quibusdam vitae magni dicta voluptate corrupti tempora. Minima nihil iusto est delectus enim. Temporibus odit itaque ut est sunt. Sed debitis illo et et corrupti iste molestiae magnam. Aut eos qui. Id eveniet est blanditiis quo. Suscipit rem voluptatem. Consequatur architecto dolor. Vero magnam magni rerum et laboriosam veritatis non. Est optio eos qui eaque ut. Eveniet ad sunt molestias sunt aut voluptas. Blanditiis doloribus earum. Itaque voluptatem inventore. Et quod et fuga quis nisi ea ipsam fugiat delectus. Fuga debitis omnis nostrum rerum iste nihil qui et. Qui aut voluptatem iste asperiores. Aperiam pariatur veniam nobis consequuntur quis. Consequatur explicabo veniam commodi earum temporibus non est dicta. Qui dolor et et sit. Et et alias. Ut sunt sapiente ullam. Quis corporis aut sit reiciendis omnis. Fugiat possimus quaerat. Odit cumque consequatur ut reprehenderit nihil perspiciatis. Qui repellat voluptatem aperiam nam veniam voluptatem natus aspernatur laudantium. Eum sunt repudiandae. Architecto sit cupiditate.'
    })));

    const interval = setInterval(()=> {
      setTime(new Date())
    }, 1000)
    
    return () => clearInterval(interval);
  }, [])

  function isRowLoaded ({ index }) {
    return !!people[index];
  }

  const fetchData = (index) => {
    setLoading(true);
    setTimeout(()=> {
      const newData = [...Array(3).keys()].map(key => ({
        id: key,
        name: `Kian Ebert ${index + key}`,
        bio: 'Exercitationem molestiae autem dignissimos ratione sunt ut temporibus. Modi iusto quos molestias. Aut ab fugit id ullam amet commodi iusto est. Itaque qui minus. Animi velit iure est at corrupti expedita deserunt. Reprehenderit non ab nihil aut aut est sint quas sunt. Doloremque ullam quod ut aut ut qui. Sapiente quod non. In praesentium quas porro aliquam eius. Aut voluptatum ea. Eum sit illo maiores libero consequuntur. Qui eius suscipit est voluptatibus consequatur omnis. Doloribus et maxime. Nisi sint quia velit rerum beatae et eum. Et dolores quibusdam vitae magni dicta voluptate corrupti tempora. Minima nihil iusto est delectus enim. Temporibus odit itaque ut est sunt. Sed debitis illo et et corrupti iste molestiae magnam. Aut eos qui. Id eveniet est blanditiis quo. Suscipit rem voluptatem. Consequatur architecto dolor. Vero magnam magni rerum et laboriosam veritatis non. Est optio eos qui eaque ut. Eveniet ad sunt molestias sunt aut voluptas. Blanditiis doloribus earum. Itaque voluptatem inventore. Et quod et fuga quis nisi ea ipsam fugiat delectus. Fuga debitis omnis nostrum rerum iste nihil qui et. Qui aut voluptatem iste asperiores. Aperiam pariatur veniam nobis consequuntur quis. Consequatur explicabo veniam commodi earum temporibus non est dicta. Qui dolor et et sit. Et et alias. Ut sunt sapiente ullam. Quis corporis aut sit reiciendis omnis. Fugiat possimus quaerat. Odit cumque consequatur ut reprehenderit nihil perspiciatis. Qui repellat voluptatem aperiam nam veniam voluptatem natus aspernatur laudantium. Eum sunt repudiandae. Architecto sit cupiditate.'
      }));
      setPeople([...people, newData])
      setLoading(false);
    }, 2000)
  }
  let itemStatusMap = {};
  const LOADING = 1;
  const LOADED = 2;
  const remoteRowCount = 100;

  const loadMoreRows = async ({ startIndex, stopIndex }) => {
    console.log('startIndex:', startIndex);
    console.log('stopIndex:', stopIndex);
    for (let index = startIndex; index <= stopIndex; index++) {
      itemStatusMap[index] = LOADING;
    }
  
    await new Promise(() => setTimeout(()=>{}, 1000));
  
    for (let index = startIndex; index <= stopIndex; index++) {
      
      itemStatusMap[index] = LOADED;
      console.log('loaded:', itemStatusMap[index]);
    }
    // Simulate an API request to load more data
    // setTimeout(()=> {
    //   const newData = [...Array(3).keys()].map(key => ({
    //     id: key,
    //     name: `Kian Ebert ${startIndex || 0 + key}`,
    //     bio: 'Exercitationem molestiae autem dignissimos ratione sunt ut temporibus. Modi iusto quos molestias. Aut ab fugit id ullam amet commodi iusto est. Itaque qui minus. Animi velit iure est at corrupti expedita deserunt. Reprehenderit non ab nihil aut aut est sint quas sunt. Doloremque ullam quod ut aut ut qui. Sapiente quod non. In praesentium quas porro aliquam eius. Aut voluptatum ea. Eum sit illo maiores libero consequuntur. Qui eius suscipit est voluptatibus consequatur omnis. Doloribus et maxime. Nisi sint quia velit rerum beatae et eum. Et dolores quibusdam vitae magni dicta voluptate corrupti tempora. Minima nihil iusto est delectus enim. Temporibus odit itaque ut est sunt. Sed debitis illo et et corrupti iste molestiae magnam. Aut eos qui. Id eveniet est blanditiis quo. Suscipit rem voluptatem. Consequatur architecto dolor. Vero magnam magni rerum et laboriosam veritatis non. Est optio eos qui eaque ut. Eveniet ad sunt molestias sunt aut voluptas. Blanditiis doloribus earum. Itaque voluptatem inventore. Et quod et fuga quis nisi ea ipsam fugiat delectus. Fuga debitis omnis nostrum rerum iste nihil qui et. Qui aut voluptatem iste asperiores. Aperiam pariatur veniam nobis consequuntur quis. Consequatur explicabo veniam commodi earum temporibus non est dicta. Qui dolor et et sit. Et et alias. Ut sunt sapiente ullam. Quis corporis aut sit reiciendis omnis. Fugiat possimus quaerat. Odit cumque consequatur ut reprehenderit nihil perspiciatis. Qui repellat voluptatem aperiam nam veniam voluptatem natus aspernatur laudantium. Eum sunt repudiandae. Architecto sit cupiditate.'
    //   }));
    //   console.log('newData:', newData);
    //   setPeople([...people, newData])
    //   setLoading(false);
    // }, 2000);
  };

  const rowRenderer = ({ key, index, style }) => {
    const person = people[index];
    let content;
    console.log('itemStatusMapppp:', itemStatusMap);
    if (itemStatusMap[index] === LOADED) {
      content = (
        <>
          <h2 className='font-bold mt-2'>{person?.name}</h2>
          <p>{person.bio}</p>
        </>
      );
    } else {
      content = "Loading...";
    }
    
    return (
      <CellMeasurer 
        cache={cache?.current}
        rowIndex={index}
        columnIndex={0}
        parent={parent}
      >
      <div key={key} style={style}>
        {content}
      </div>
    </CellMeasurer>
    );
  };

  return (
    <div>
      <p>{time.toISOString()}</p>
      <div style={{width: '100%', height: '100vh'}}>
        <AutoSizer>
          {
            ({width, height})=> (
              <InfiniteLoader
              rowCount={remoteRowCount}
                isRowLoaded={isRowLoaded}
                loadMoreRows={loadMoreRows}
              >
                {({ onRowsRendered, registerChild }) => (
                  <List 
                    ref={registerChild}
                    width={width} 
                    height={height}
                    rowCount={people.length}
                    rowHeight={cache?.current?.rowHeight}
                    deferredMeasurementCache={cache?.current}
                    onRowsRendered={onRowsRendered}
                    rowRenderer={rowRenderer}
                    // rowRenderer={({key,index, style, parent})=> {
                    //   const person = people[index]
                    //   return (
                    //   <CellMeasurer 
                    //       cache={cache?.current}
                    //       rowIndex={index}
                    //       columnIndex={0}
                    //       parent={parent}
                    //     >
                    //     <div key={key} style={style}>
                    //       <h2 className='font-bold mt-2'>{person?.name}</h2>
                    //       <p>{person.bio}</p>
                    //     </div>
                    //   </CellMeasurer>
                    //   )
                    // }}
                    //onRowsRendered={onRowsRendered}
                  />
                )}
              </InfiniteLoader>
              
            )
          }
        </AutoSizer>
      </div>
      
      {/* <ul>
        {people.map((person) => (
          <li key={person.id}>
            <h2 className='font-bold mt-2'>{person.name}</h2>
            <p>{person.bio}</p>
          </li>
        ))}
      </ul> */}
    </div>
  )
}
