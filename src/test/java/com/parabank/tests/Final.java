package com.parabank.tests;

import org.graphwalker.java.annotation.Model;
import org.graphwalker.java.annotation.Vertex;
import org.graphwalker.java.annotation.Edge;

@Model(file = "graphwalker-tests/src/test/resources/com/parabank/resources/ParabankModel.json")
public interface Final {
///////LOGIN PAGE
    @Vertex
    void v_LoginPage();

    @Vertex
    void v_EnteredInvalidCredentials();

    @Vertex
    void v_LoginError();

    @Vertex
    void v_EnteredValidCredentials();

    @Vertex
    void v_Dashboard();

    @Edge
    void e_StartBrowser();

    @Edge
    void e_EnterInvalidCredentials();

    @Edge
    void e_EnterValidCredentials();

    @Edge
    void e_ClickLoginButton();

    @Edge
    void e_ClickLogoutButton();

    @Edge
    void e_RetryLogin();
/////////////////////////////////////////////

/////TRANSFERFUNDS
    @Vertex
    void v_TransferComplete();

    @Vertex
    void v_TransferFunds();

    @Vertex
    void v_ValidationError();

    @Vertex
    void v_EnteredInvalidAmount();

    @Vertex
    void v_EnteredValidAmount();

    @Edge
    void e_ClickTransferFundsButton();

    @Edge
    void e_ReturnToDashboard();

    @Edge
    void e_ClickTransferButton();

    @Edge
    void e_EnterInvalidAmount();

    @Edge
    void e_EnterValidAmount();

/////////////////////////////////////////////////
/// OPEN NEW ACCOUNT
    @Vertex
    void v_OpenAccount();

    @Vertex
    void v_AccountOpened();

    @Vertex
    void v_AccountSelected();

    @Vertex
    void v_SelectedType();

    @Edge
    void e_ClickOpenNewAccount();

    @Edge
    void e_SelectType();

    @Edge
    void e_SelectAccount();

    @Edge
    void e_OpenNewAccount();

////////////////////////////////////////////
/// UPDATE CONTACT INFO

    @Vertex
    void v_UpdateProfile();

    @Vertex
    void v_ProfileUpdated();

    @Edge
    void e_ClickUpdateContactInfo();

    @Edge
    void e_ClickUpdateProfileButton();

    @Edge
    void e_ChangeName();

    @Edge
    void e_ChangeLastName();

    @Edge
    void e_ChangeAdress();

    @Edge
    void e_ChangeCity();

    @Edge
    void e_ChangeState();

    @Edge
    void e_ChangeZipCode();

    @Edge
    void e_ChangePhone();

//////////////////////////////////////
/// ACCOUNTS OVERVIEW
    @Vertex
    void v_AccountsOverview();

    @Vertex
    void v_AccountDetails();

    @Vertex
    void v_TransactionDetails();

    @Edge
    void e_ClickAccountsOverview();

    @Edge
    void e_ClickTransaction();

    @Edge
    void e_ClickAccountNumber();

///////////////////////////////////////////
/// BILLPAY

    @Vertex
    void v_BillPayForm_Empty();

    @Vertex
    void v_BillPayForm_ValidationErrors();

    @Vertex
    void v_BillPayForm_PartiallyFilled();

    @Vertex
    void v_BillPayForm_AllFilled();

    @Vertex
    void v_BillPayForm_InvalidData();

    @Vertex
    void v_BillPayForm_Valid();

    @Vertex
    void v_BillPaymentComplete();

    @Edge
    void e_ClickBillPay();

    @Edge
    void e_ClickSendEmpty();

    @Edge
    void e_FillPayeeName();

    @Edge
    void e_FillAddress();

    @Edge
    void e_FillAllRemainingFields();

    @Edge
    void e_CorrectErrors();

    @Edge
    void e_ClickSendValid();

    @Edge
    void e_ClickSendInvalid();

    @Edge
    void e_CorrectInvalidData();
}
