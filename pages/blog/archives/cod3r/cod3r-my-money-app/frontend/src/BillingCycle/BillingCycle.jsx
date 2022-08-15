import React, { Component } from "react"

import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import ContentHeader from "../common/template/ContentHeader"
import Content from "../common/template/Content"

import Tabs from "../common/Tab/Tabs"
import TabsContent from "../common/Tab/TabsContent"
import TabsHeader from "../common/Tab/TabsHeader"

import TabHeader from "../common/Tab/TabHeader"
import TabContent from "../common/Tab/TabContent"
import List from "./BillingCycleList"
import Form from "./BillingCycleForm" 
import { init, create, update, remove } from "./BillingCycleActions"

class BillingCycle extends Component{ 

    componentDidMount(){ 
        this.props.init()
    } 

    render(){
        return (
            <div>
                <ContentHeader title="Ciclos de Pagamentos" small="Cadastro" />
                <Content>
                    <Tabs>
                        <TabsHeader>
                            <TabHeader label="Listar" icon="bars" target="tabList" />
                            <TabHeader label="Incluir" icon="plus" target="tabCreate" />
                            <TabHeader label="Alterar" icon="pencil" target="tabUpdate" />
                            <TabHeader label="Excluir" icon="trash-o" target="tabDelete" />
                        </TabsHeader>    
                        <TabsContent>
                            <TabContent id="tabList">
                                <List />
                            </TabContent>
                            <TabContent id="tabCreate">
                                <Form onSubmit={this.props.create}
                                    submitLabel="Incluir" submitClass="primary"/>
                            </TabContent>
                            <TabContent id="tabUpdate">
                                <Form onSubmit={this.props.update}
                                    submitLabel="Alterar" submitClass="info"/>
                            </TabContent>
                            <TabContent id="tabDelete">
                                <Form onSubmit={this.props.remove} readOnly={true}
                                    submitLabel="Excluir" submitClass="danger"/>
                            </TabContent> 
                        </TabsContent>    
                    </Tabs>
                </Content>
            </div>
        )
    } 
} 

const mapDispatchToProps = dispatch => bindActionCreators({
    init, create, update, remove
}, dispatch)

export default connect(null, mapDispatchToProps)(BillingCycle)
