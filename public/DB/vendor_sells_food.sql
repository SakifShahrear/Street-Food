CREATE TABLE VENDOR_SELLS_FOOD (
    V_ID VARCHAR2(50),
    FOOD_ID VARCHAR2(50),
    PRIMARY KEY (V_ID, FOOD_ID),
    FOREIGN KEY (V_ID) REFERENCES VENDORS(V_ID) ON DELETE CASCADE,
    FOREIGN KEY (FOOD_ID) REFERENCES FOOD(FOOD_ID) ON DELETE CASCADE
);

--------------------------------------insert data-----------------------------
INSERT INTO VENDOR_SELLS_FOOD (
    V_ID,
    FOOD_ID
) VALUES (
    'S_16',
    'F_40'
);

INSERT INTO VENDOR_SELLS_FOOD (
    V_ID,
    FOOD_ID
) VALUES (
    'S_16',
    'F_41'
);

INSERT INTO VENDOR_SELLS_FOOD (
    V_ID,
    FOOD_ID
) VALUES (
    'S_16',
    'F_42'
);

INSERT INTO VENDOR_SELLS_FOOD (
    V_ID,
    FOOD_ID
) VALUES (
    'S_16',
    'F_43'
);

INSERT INTO VENDOR_SELLS_FOOD (
    V_ID,
    FOOD_ID
) VALUES (
    'S_16',
    'F_44'
);

INSERT INTO VENDOR_SELLS_FOOD (
    V_ID,
    FOOD_ID
) VALUES (
    'S_16',
    'F_45'
);

INSERT INTO VENDOR_SELLS_FOOD (
    V_ID,
    FOOD_ID
) VALUES (
    'S_16',
    'F_46'
);

INSERT INTO VENDOR_SELLS_FOOD (
    V_ID,
    FOOD_ID
) VALUES (
    'S_16',
    'F_47'
);

INSERT INTO VENDOR_SELLS_FOOD (
    V_ID,
    FOOD_ID
) VALUES (
    'S_16',
    'F_48'
);

INSERT INTO VENDOR_SELLS_FOOD (
    V_ID,
    FOOD_ID
) VALUES (
    'S_16',
    'F_38'
);

INSERT INTO VENDOR_SELLS_FOOD (
    V_ID,
    FOOD_ID
) VALUES (
    'S_16',
    'F_39'
);