cube(`Orders`, {
  sql: `SELECT * FROM orders`,

  preAggregations: {
    ordersByVendor: {
      measures: [Orders.count],
      dimensions: [Vendors.name]
    },
    ordersByH3: {
      measures: [Orders.count],
      dimensions: [Orders.h3_5]
    }
  },

  joins: {
    Vendors: {
      sql: `${CUBE}.vendor_id = ${Vendors}.vendor_id`,
      relationship: `belongsTo`
    }
  },
  measures: {
    count: {
      type: `count`
    }
  },
  dimensions: {
    id: {
      sql: `order_id`,
      type: `number`,
      primaryKey: true
    },
    title: {
      sql: `title`,
      type: `string`
    },
    location: {
      type: `geo`,
      latitude: {
        sql: `${CUBE}.lat`,
      },
      longitude: {
        sql: `${CUBE}.lon`,
      },
    },
    h3_9: {
      sql: `h3_9`,
      type: `string`
    },
    h3_5: {
      sql: `substring(${CUBE}.h3_9, 1, 6)`,
      type: `string`
    },
  },
  dataSource: `default`,
});