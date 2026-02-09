const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      find countries{' '}
      <input
        value={filter}
        onChange={handleFilterChange}
      />
      
    </div>
  )
}
console.log('Filter rendered')

export default Filter
