+++
date = "2025-03-17"
title = "AvroTools"
+++

AvroTools is a collection of tools, written in C# to work effectively with the [Avro](https://avro.apache.org/) schema and serialization file formats.

## Features

AvroTools supports the following features that are improvements upon the largely Java-based implementation provided by Apache.

* Compile [Avro IDL](https://avro.apache.org/docs/current/idl.html) to an [Avro Protocol](https://avro.apache.org/docs/current/spec.html#Protocol+Declaration).
* Compile [Avro IDL](https://avro.apache.org/docs/current/idl.html) to [Avro Schema](https://avro.apache.org/docs/current/spec.html#schemas).
* Generate C# classes for protocols and schemas. The generated code is an improvement upon the canonical implementation.
* Supports additional logical types compared to reference compiler. Note that these may not be usable in practice but can be compiled to compatible Avro Protocol/Schema. The following additional logical types are supported in IDL:
  * `uuid`
  * `time-micros`
  * `timestamp-micros`
  * `local-timestamp-ms`
  * `local-timestamp-micros`
  * `duration`

## Install

This is not yet available on nuget, so the code is only available on [GitHub](https://github.com/sjp/AvroTools).

## Usage

The intention is for this to be installable as a [`dotnet tool`](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-tool-install), but for the moment usage is possible via `dotnet run`.

Most of the documentation is provided by the tool itself (outside of the language specifications).

```plain
$ dotnet run --project src/AvroTool
    ___                 ______            __
   /   |_   ___________/_  __/___  ____  / /
  / /| | | / / ___/ __ \/ / / __ \/ __ \/ /
 / ___ | |/ / /  / /_/ / / / /_/ / /_/ / /
/_/  |_|___/_/   \____/_/  \____/\____/_/

The helpful Avro compiler tool.

avrotool

Usage:
  avrotool [options] [command]

Options:
  -?, -h, --help  Show help and usage information
  --version       Show version information

Commands:
  idl <idlfile>                Generates a JSON protocol file from an Avro IDL file.
  idl2schemata <idlfile>       Extract JSON schemata of the types from an Avro IDL file.
  codegen <input> <namespace>  Generates C# code for a given Avro IDL, protocol or schema.
```

### Examples

#### Compile IDL to an Avro Protocol

```plain
$ cat sample.avdl
protocol TestProtocol {
  record TestRecord {
    string FirstName;
    string LastName;
  }

  void Ping();
}
$ dotnet run --project src/AvroTool idl sample.avdl
Generated /home/sjp/repos/AvroTools/TestProtocol.avpr
$ cat TestProtocol.avpr
{
  "protocol": "TestProtocol",
  "types": [
    {
      "type": "record",
      "fields": [
        {
          "name": "FirstName",
          "type": "string"
        },
        {
          "name": "LastName",
          "type": "string"
        }
      ],
      "name": "TestRecord"
    }
  ],
  "messages": {
    "Ping": {
      "request": [],
      "response": "null"
    }
  }
}
```

#### Compile IDL to Avro Schema

```plain
$ cat sample.avdl
protocol TestProtocol {
  record TestRecord {
    string FirstName;
    string LastName;
  }

  enum TestEnum {
    A,
    B,
    C
  }

  void Ping();
}
$ dotnet run --project src/AvroTool idl2schemata sample.avdl
Generated /home/sjp/repos/AvroTools/TestRecord.avsc
Generated /home/sjp/repos/AvroTools/TestEnum.avsc

$ cat TestRecord.avsc
{
    "type": "record",
    "name": "TestRecord",
    "fields": [
        {
            "name": "FirstName",
            "type": "string"
        },
        {
            "name": "LastName",
            "type": "string"
        }
    ]
}

$ cat TestEnum.avsc
{
    "type": "enum",
    "name": "TestEnum",
    "symbols": [
        "A",
        "B",
        "C"
    ]
}
```

#### Generate C# code for Avro Protocol and Schema


```sh
$ cat sample.avdl
protocol TestProtocol {
  record TestRecord {
    string FirstName;
    string LastName;
  }

  void Ping();
}

$ dotnet run --project src/AvroTool codegen sample.avdl Test.Code.Namespace
Generated /home/sjp/repos/AvroTools/TestProtocol.cs
Generated /home/sjp/repos/AvroTools/TestRecord.cs

// Contents of files omitted for brevity
```

## Further Information

For more information visit the repository on [GitHub](https://github.com/sjp/AvroTools).
