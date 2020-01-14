// [kafka-node](https://github.com/SOHU-Co/kafka-node)
const kafka = require('kafka-node')
const { kafkaHost } = require('../config/kafka')


// [Producer(KafkaClient, [options], [customPartitioner])](https://github.com/SOHU-Co/kafka-node#producerkafkaclient-options-custompartitioner)
const client = new kafka.KafkaClient({ kafkaHost })
const producer = new kafka.Producer(client)

km = new KeyedMessage('key', 'message')

payloads = [
    { topic: 'topic1', messages: 'hi', partition: 0 },
    { topic: 'topic2', messages: ['hello', 'world', km] },
]

// [Events](https://github.com/SOHU-Co/kafka-node#events)
producer.on('ready', () => {
    // [send(payloads, cb)](https://github.com/SOHU-Co/kafka-node#sendpayloads-cb)
    producer.send(payloads, (err, data) => {
        console.log(data);
    });
});
producer.on('error', (err) => { })

// [createTopics(topics, cb)](https://github.com/SOHU-Co/kafka-node#createtopicstopics-cb)
const topicsToCreate = [
    {
        topic: 'topic1',
        partitions: 1,
        replicationFactor: 2
    },
    {
        topic: 'topic2',
        partitions: 5,
        replicationFactor: 3,
        // Optional set of config entries
        configEntries: [
            {
                name: 'compression.type',
                value: 'gzip'
            },
            {
                name: 'min.compaction.lag.ms',
                value: '50'
            }
        ],
        // Optional explicit partition / replica assignment
        // When this property exists, partitions and replicationFactor properties are ignored
        replicaAssignment: [
            {
                partition: 0,
                replicas: [3, 4]
            },
            {
                partition: 1,
                replicas: [2, 1]
            }
        ]
    }
];

client.createTopics(topicsToCreate, (error, result) => {
    // result is an array of any errors if a given topic could not be created
});
