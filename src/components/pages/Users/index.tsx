import React, { useState,useEffect} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {NotificationManager} from 'react-notifications';
import { Animated } from "react-animated-css";
import { ANIMATION_CONTAINER_IN, ANIMATION_CONTAINER_OUT } from '../../shared/animationHelper';
import { Link } from 'react-router-dom';
import ReactTableHeader from '../../ui/ReactTableHeader';
import restService from '../../shared/restService';


const UsersPage : React.FunctionComponent = () => {

        const [loading, setLoading] = useState<boolean>(true);
        const [users, setUsers] = useState([]);
        const [pages, setPages] = useState<number>(-1);
        const [pageSize, setPageSize] = useState<number>(5);
        const [searchQuery, setSearchQuery] = useState<string>("");

        let reactTable;

        useEffect(() => { 
          reactTable.fireFetchData();
        }, [searchQuery,reactTable])
        
        const deleteRecord = async(id:number) => {
          try {
            const result = await restService.delete("/api/users"+`/${id}`);
            
            if(result.status === 204)
            {
                NotificationManager.success('User has been deleted', 'Success');
                setSearchQuery(searchQuery+" ");
            }
        }catch(error) {
            NotificationManager.error('There are some Errors', 'Error');
        };
        }

        const fetchData = async (state) => {
          setLoading(true);
          const orderBy = state.sorted.length>0 ? state.sorted[0].id : "Id";
          const requestConfig = {
            params: {
                pageSize: state.pageSize,
                pageNumber: state.page+1,
                searchQuery,
                orderBy
              }
          }
          const {data, headers} = await restService.get('/api/users',requestConfig);
          const pagination = JSON.parse(headers['x-pagination']);
          setPages(pagination.totalPages);
          setPageSize(state.pageSize);
          setUsers(data);
          setLoading(false);
        }

        const columns = [{
            Header: 'ID',
            accessor: 'id'
          },
          {
            Header: 'Firstname',
            accessor: 'firstName'
          },
          {
            Header: 'Lastname',
            accessor: 'lastName'
          },
          {
            Header: 'Email',
            accessor: 'email'
          },
          {
            Header: 'Role',
            accessor: 'role'
          },
          {
            Header: 'Status',
            accessor: 'status'
          },
          {
            width: 300,
            Header: "Actions",
            Cell: ({ original }) => (
                <div className="text-center">
                    <Link to={{pathname: `/users/${original.id}`}} className="btn btn-info">
                        <i className="fa fa-edit"></i>
                        {' '}    Edit 
                    </Link>
                    &nbsp;
                    <button className="btn btn-danger" onClick={() => deleteRecord(original.id)}>
                        <i className="fa fa-times"></i>
                        {' '}    Delete
                    </button>
                </div>
            )
          }];
         
          return <>
          <Animated animationIn={ANIMATION_CONTAINER_IN} animationOut={ANIMATION_CONTAINER_OUT} isVisible={true}>
            <ReactTableHeader
              urlCreate="/users/create"
              onClick={(searchQuery: string) => {
                setSearchQuery(searchQuery);
              }}
            />

            <ReactTable
              ref={refReactTable => {reactTable = refReactTable;}}
              columns={columns}
              data={users}
              pages={pages}
              loading={loading}
              manual
              defaultPageSize={pageSize}
              pageSize={pageSize}
              pageSizeOptions={[1,5,10]}
              sortable={false}
              onFetchData={async (state, instance) => {fetchData(state)}}
            />
            </Animated>
        </>
}

export default UsersPage;