import React, { memo, useCallback, useEffect, useState } from 'react';
import fetchGraphQL from 'services/fetchGraphQL';
import Table from "components/Table/Table.js";

export const Albums: React.FC = () => {
    const [albums, setAlbums] = useState([]);
    const [albumsDataTable, setAlbumsDataTable] = useState([]);
    useEffect(() => {
        let isMounted = true;
        const AlbumsQuery = `
        query abc {
          albums{
            data{
              id
              title
            }
          }
        }
      `;

        fetchGraphQL(AlbumsQuery).then(response => {
            if (!isMounted) {
                return;
            }
            // const data = response.data;
            setAlbums(response.data.albums.data);
            if(response.data.albums.data && response.data.albums.data.length){
                setAlbumsDataTable(convertDataTable(response.data.albums.data,["id","title"]))
            }
        }).catch(error => {
            console.error(error);
        });

        return () => {
            isMounted = false;
        };
    }, [fetchGraphQL]);
    
    const convertDataTable = (data,fields) =>{
        let result = []
        data.map(ed=>{
            let row = []
            fields.map(ef=>{
                row.push(ed[ef])
            })
            result.push(row)
        })
        return result
    }
    return (
        <div>
            <Table
                tableHeaderColor="primary"
                tableHead={['ID', 'Title']}
                tableData={albumsDataTable}
            />
        </div>
    )
}
export default Albums;

