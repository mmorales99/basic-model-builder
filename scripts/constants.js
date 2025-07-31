const ModelTypes = Object.freeze({
    Field: "field",
    Property: "property",
    Method: "method",
    Constructor: "constructor",
    Destructor: "destructor"
});

// C# visibilities (public, private...)
const VisibilityTypes = Object.freeze({
  PUBLIC: "public",
  PRIVATE: "private",
  PROTECTED: "protected",
  INTERNAL: "internal",
  PROTECTED_INTERNAL: "protected internal",
  PRIVATE_PROTECTED: "private protected"
});

// C# class types (class, interface...)
const ClassTypes = Object.freeze({
  CLASS: "class",
  INTERFACE: "interface",
  STRUCT: "struct",
  ENUM: "enum",
  RECORD: "record",
  DELEGATE: "delegate"
});

// C# primitive data types (int, bool, string...)
const PrimitiveDataTypes = Object.freeze({
  BOOL: "bool",
  BYTE: "byte",
  CHAR: "char",
  DECIMAL: "decimal",
  DOUBLE: "double",
  FLOAT: "float",
  INT: "int",
  LONG: "long",
  SBYTE: "sbyte",
  SHORT: "short",
  UINT: "uint",
  ULONG: "ulong",
  USHORT: "ushort",
  STRING: "string",
  OBJECT: "object",
  VOID: "void"
});


function mapEnumToSelect(elementId, enumerate) {
    const tipoComponenteSelect = document.getElementById(elementId)
    Object.entries(enumerate).forEach(([key, value]) =>{
        const option = document.createElement('option')
        option.key = key
        option.value = value
        option.text = value
        tipoComponenteSelect.appendChild(option)
    })
}


export { mapEnumToSelect, ModelTypes, VisibilityTypes, ClassTypes, PrimitiveDataTypes };