package app.doushi.domain.enumeration;

/**
 * The KyuDan enumeration.
 */
public enum KyuDan {
    MUKYU, KYUKYU, HACHIKYU, NANAKYU, ROKYU, GOKYU, YONKYU, SANKYU, NIKYU, IKKYU, SHODAN;

    public static KyuDan valueOf(int ordinal) {
       // support returning the KyuDan from the ordinal
        for (KyuDan k : KyuDan.values()) {
            if (k.ordinal() == ordinal) {
                return k;
            }
        }
        return MUKYU;
    }
}
