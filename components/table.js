/* eslint-disable max-len */
import { useTable } from 'react-table'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

/*
 * @param schema: Frictionless Table Schmea
 * @param data: an array of data objects e.g. [ {a: 1, b: 2}, {a: 5, b: 7} ]
 */
const Table = ({ schema, data }) => {
  const columns = schema.fields.map((field) => (
    {
      Header: field.title || field.name,
      accessor: field.name
    }
  ))
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  return (
    <div className="overflow-x-auto max-h-90p">
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <TableRow className="bg-portal5 bg-opacity-70" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <TableCell {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            prepareRow(row)
            return (
              // eslint-disable-next-line react/jsx-key
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <TableCell {...cell.getCellProps()} className="truncate max-w-screen-sm">
                      {cell.render('Cell')}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </MaUTable>
    </div>
  )
}

export default Table
