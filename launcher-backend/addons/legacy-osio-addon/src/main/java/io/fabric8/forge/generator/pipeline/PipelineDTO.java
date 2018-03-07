/**
 * Copyright 2005-2015 Red Hat, Inc.
 * <p>
 * Red Hat licenses this file to you under the Apache License, version
 * 2.0 (the "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied.  See the License for the specific language governing
 * permissions and limitations under the License.
 */
package io.fabric8.forge.generator.pipeline;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 */
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class PipelineDTO implements Comparable<PipelineDTO> {
    private String label;
    private String value;
    private String descriptionMarkdown;
    private String builder;
    private List<String> stages;
    private List<String> environments;

    public PipelineDTO() {
    }

    public PipelineDTO(String value, String label, String builder, String descriptionMarkdown) {
        this.value = value;
        this.label = label;
        this.builder = builder;
        this.descriptionMarkdown = descriptionMarkdown;
    }

    @Override
    public String toString() {
        return "PipelineDTO{" +
                "value='" + value + '\'' +
                '}';
    }

    @Override
    public int compareTo(PipelineDTO o) {
        return label.compareTo(o.label);
    }

    public String getBuilder() {
        return builder;
    }

    public void setBuilder(String builder) {
        this.builder = builder;
    }

    public String getDescriptionMarkdown() {
        return descriptionMarkdown;
    }

    public void setDescriptionMarkdown(String descriptionMarkdown) {
        this.descriptionMarkdown = descriptionMarkdown;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public List<String> getEnvironments() {
        return environments;
    }

    public void setEnvironments(List<String> environments) {
        this.environments = environments;
    }

    public List<String> getStages() {
        return stages;
    }

    public void setStages(List<String> stages) {
        this.stages = stages;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PipelineDTO that = (PipelineDTO) o;

        return value.equals(that.value);

    }

    @Override
    public int hashCode() {
        return value.hashCode();
    }
}
