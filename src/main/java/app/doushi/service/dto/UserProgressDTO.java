package app.doushi.service.dto;

import java.util.*;

import app.doushi.domain.enumeration.KyuDan;

public class UserProgressDTO {

    private Map<KyuDan,Long> progress = new HashMap<>();

    public Map<KyuDan,Long> getProgress() {
        return progress;
    }

    public void setProgress(Map<KyuDan,Long> progress) {
        this.progress = progress;
    }
    
}
