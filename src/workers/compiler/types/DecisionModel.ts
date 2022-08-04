import {NamedElement} from "./NamedElement";
import {ModelProperties} from "../compiler.t";
import JSONPath from "jsonpath";

/*
<xsd:complexType name="tDefinitions">
<xsd:complexContent>
  <xsd:extension base="tNamedElement">
    <xsd:sequence>
      <xsd:element ref="import" minOccurs="0" maxOccurs="unbounded"/>
      <xsd:element name="itemDefinition" type="tItemDefinition" minOccurs="0" maxOccurs="unbounded"/>
      <xsd:element ref="drgElement" minOccurs="0" maxOccurs="unbounded"/>
      <xsd:element ref="artifact" minOccurs="0" maxOccurs="unbounded"/>
      <xsd:element name="elementCollection" type="tElementCollection" minOccurs="0" maxOccurs="unbounded"/>
      <xsd:element ref="businessContextElement" minOccurs="0" maxOccurs="unbounded"/>
      <xsd:element ref="dmndi:DMNDI" minOccurs="0" maxOccurs="1"/>
    </xsd:sequence>
    <xsd:attribute name="expressionLanguage" type="xsd:anyURI" use="optional" default="https://www.omg.org/spec/DMN/20191111/FEEL/"/>
    <xsd:attribute name="typeLanguage" type="xsd:anyURI" use="optional" default="https://www.omg.org/spec/DMN/20191111/FEEL/"/>
    <xsd:attribute name="namespace" type="xsd:anyURI" use="required"/>
    <xsd:attribute name="exporter" type="xsd:string" use="optional"/>
    <xsd:attribute name="exporterVersion" type="xsd:string" use="optional"/>
  </xsd:extension>
</xsd:complexContent>
</xsd:complexType>
 */
export class DecisionModel extends NamedElement {
	// @ts-ignore
	namespace: string;

	constructor(raw: any, properties: ModelProperties) {
		super(raw, properties);

		this.construct();
	}

	public construct() {
		super.construct();
		this.namespace = JSONPath.value(this.raw, JSONPath.stringify(["$", "_", "namespace"]));
	}

	public update(path: string, value: any) {
		JSONPath.value(this.raw, path, value);
		this.construct();
	}
}
