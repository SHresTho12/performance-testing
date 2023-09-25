# performance-testing

## Start Grafana , Loki and influxdb

```bash
docker-compose -p logs -f docker-compose-log.yaml up
```

## Start the load test

Test Files are kept in the `k6/tests` directory

## Run tests

```bash
TEST=circle docker-compose -p k6 up --force-recreate --build k6
```
