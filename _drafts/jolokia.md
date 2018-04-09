JVM_EXTRA_OPS="$JVM_EXTRA_OPS -javaagent:/usr/share/cassandra/lib/jolokia-jvm-1.2.2-agent.jar=port=8080,host=0.0.0.0"

su cassandra 
java -jar jolokia-jvm-1.2.2-agent.jar --host 0.0.0.0 --port 8778 --verbose start 3517

add to /etc/init.d/cassandra
   start)
      # Cassandra startup
      echo -n "Starting Cassandra: "
      su $CASSANDRA_OWNR -c "$CASSANDRA_PROG -p $pid_file" > $log_file 2>&1
      su $CASSANDRA_OWNR -c "java -jar /usr/share/cassandra/lib/jolokia-jvm-1.2.2-agent.jar --host 0.0.0.0 --port 8778 --verbose start `cat $pid_file`" > $log_file 2>&1
      echo "Ok"


curl http://10.105.163.220:8778/jolokia/org.apache.cassandra.internal:type=FlushWriter/CurrentBlockedTasks

curl http://10.105.163.220:8778/jolokia/java.lang:type=Memory/HeapMemoryUsage
{"timestamp":1415238435,"status":200,"request":{"mbean":"java.lang:type=Memory","attribute":"HeapMemoryUsage","type":"read"},"value":{"max":505151488,"committed":505151488}}

Monitoring Storage 
what do the customers care about - shares,volumes,


iptables -A INPUT -p tcp --dport 8778 -j ACCEPT


function Get-JolokiaDetails
{
    param (
       $server = "10.104.209.252",
       $port   = "8778",
       $mbean  = "java.lang",
       $type   = "Memory/HeapMemoryUsage"
    )

   process {

      $cassandra = Invoke-WebRequest "http://"  $server:$port/jolokia/read/$mbean:type=$type"
      return ($cassandra.content | convertfrom-json).value
   }
}