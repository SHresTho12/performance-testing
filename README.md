# performance-testing

## Start Grafana , Loki and influxdb

```bash
docker-compose -p logs -f docker-compose-log.yaml up
```

## Start the load test

```bash
 docker-compose up loki grafana influxdb chronograf
```

```bash
docker-compose -p k6 up promtail
```

```bash
docker-compose run --rm k6 run /scripts/setup.test.js
```
